/**
 * Image Conversion Script
 *
 * Converts PNG and JPEG images to AVIF and WEBP formats
 * - PNG: Lossless conversion with maximum compression
 * - JPEG: Quality 90 conversion with maximum compression
 * - Skips existing files unless --force flag is used
 *
 * Usage:
 *   node convert-images.js [options]
 *
 * Options:
 *   --dry-run       Show what would be converted without converting
 *   --force         Reconvert existing AVIF/WEBP files
 *   --quality <n>   Override JPEG quality (1-100, default: 90)
 *   --help          Show help message
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// Compression constants
const DEFAULT_PNG_AVIF_QUALITY = 50;
const DEFAULT_PNG_WEBP_QUALITY = 90;
const DEFAULT_JPEG_AVIF_QUALITY = 50;
const DEFAULT_JPEG_WEBP_QUALITY = 90;
const AVIF_MAX_EFFORT = 9;
const WEBP_MAX_EFFORT = 6;
const BATCH_SIZE = 10;
const PAD_START = 4;

// Directories to scan
const SCAN_DIRS = ['common', 'free', 'dreamer', 'passion'];

// Cache file
const CACHE_FILE = 'convert-images.json';

class ImageConverter {
    constructor(options = {}) {
        this.dryRun = options.dryRun || false;
        this.force = options.force || false;

        // Quality settings for each format combination
        this.pngAvifQuality = options.pngAvifQuality || DEFAULT_PNG_AVIF_QUALITY;
        this.pngWebpQuality = options.pngWebpQuality || DEFAULT_PNG_WEBP_QUALITY;
        this.jpegAvifQuality = options.jpegAvifQuality || DEFAULT_JPEG_AVIF_QUALITY;
        this.jpegWebpQuality = options.jpegWebpQuality || DEFAULT_JPEG_WEBP_QUALITY;

        this.stats = {
            pngFound: 0,
            jpegFound: 0,
            avifCreated: 0,
            webpCreated: 0,
            skipped: 0,
            skippedLarger: 0,
            avifSkippedLargerThanWebp: 0,
            cacheHits: 0,
            errors: 0,
            qualityReduced: [],
        };

        this.imageFiles = [];
        this.cache = {};
    }

    /**
     * Load cache from file
     */
    async loadCache() {
        try {
            const cacheData = await fs.readFile(path.join(__dirname, CACHE_FILE), 'utf8');
            this.cache = JSON.parse(cacheData);
        } catch (error) {
            // Cache file doesn't exist or is invalid, start fresh
            this.cache = {};
        }
    }

    /**
     * Save cache to file
     */
    async saveCache() {
        if (!this.dryRun) {
            try {
                await fs.writeFile(
                    path.join(__dirname, CACHE_FILE),
                    JSON.stringify(this.cache, null, 2),
                    'utf8'
                );
            } catch (error) {
                console.error('Warning: Could not save cache:', error.message);
            }
        }
    }

    /**
     * Get file hash for cache key
     */
    async getFileHash(filePath) {
        const stats = await fs.stat(filePath);
        const data = `${filePath}:${stats.size}:${stats.mtime.getTime()}`;
        return crypto.createHash('md5').update(data).digest('hex');
    }

    /**
     * Check if file needs processing
     */
    async needsProcessing(filePath) {
        if (this.force) {
            return true;
        }

        const hash = await this.getFileHash(filePath);
        return !this.cache[hash];
    }

    /**
     * Mark file as processed in cache
     */
    async markProcessed(filePath, result) {
        const hash = await this.getFileHash(filePath);
        this.cache[hash] = {
            timestamp: Date.now(),
            ...result,
        };
    }

    /**
     * Main conversion process
     */
    async convert() {
        console.log(this.dryRun ? 'Image Conversion Script (DRY RUN)' : 'Image Conversion Script');
        console.log('='.repeat(this.dryRun ? 38 : 23));
        console.log();

        // Load cache
        await this.loadCache();

        // Scan directories
        console.log('Scanning directories...');
        for (const dir of SCAN_DIRS) {
            const dirPath = path.join(__dirname, dir);
            try {
                await this.scanDirectory(dirPath);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error(`Error scanning ${dir}:`, error.message);
                }
            }
        }

        console.log(`Found ${this.stats.pngFound} PNG files`);
        console.log(`Found ${this.stats.jpegFound} JPEG files`);
        console.log();

        if (this.imageFiles.length === 0) {
            console.log('No images found to convert.');
            return;
        }

        // Convert images in batches
        console.log(this.dryRun ? 'Would convert:' : 'Converting images...');
        const totalConversions = this.imageFiles.length * 2; // Each image → AVIF + WEBP

        for (let i = 0; i < this.imageFiles.length; i += BATCH_SIZE) {
            const batch = this.imageFiles.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (file, batchIndex) => {
                const globalIndex = (i + batchIndex) * 2;
                await this.convertImage(file, globalIndex, totalConversions);
            }));
        }

        // Save cache and print summary
        await this.saveCache();
        this.printSummary();
    }

    /**
     * Recursively scan directory for images
     */
    async scanDirectory(dirPath) {
        let entries;
        try {
            entries = await fs.readdir(dirPath, { withFileTypes: true });
        } catch (error) {
            return;
        }

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                if (entry.name !== '.git') {
                    await this.scanDirectory(fullPath);
                }
                continue;
            }

            if (!entry.isFile()) {
                continue;
            }

            const ext = path.extname(entry.name).toLowerCase();
            if (ext === '.png') {
                this.stats.pngFound++;
                this.imageFiles.push({ path: fullPath, type: 'png' });
            } else if (ext === '.jpg' || ext === '.jpeg') {
                this.stats.jpegFound++;
                this.imageFiles.push({ path: fullPath, type: 'jpeg' });
            }
        }
    }

    /**
     * Convert a single image to AVIF and WEBP
     */
    async convertImage(file, index, total) {
        const { path: filePath, type } = file;
        const baseName = path.basename(filePath, path.extname(filePath));
        const dirName = path.dirname(filePath);

        // Check if file needs processing
        if (!await this.needsProcessing(filePath)) {
            this.stats.cacheHits++;
            return;
        }

        // Convert to WEBP first
        const webpResult = await this.convertToFormat(filePath, dirName, baseName, 'webp', type, index + 2, total);

        // Always convert to AVIF from original, regardless of WEBP result
        // Pass WEBP size for comparison only if WEBP was successful
        const webpSizeForComparison = (webpResult && webpResult.success) ? webpResult.size : null;
        const avifResult = await this.convertToFormat(filePath, dirName, baseName, 'avif', type, index + 1, total, webpSizeForComparison);

        // Mark as processed
        await this.markProcessed(filePath, {
            avif: avifResult,
            webp: webpResult,
        });
    }

    /**
     * Convert image to specific format with iterative quality reduction
     */
    async convertToFormat(inputPath, dirName, baseName, format, type, index, total, webpSize = null) {
        const outputPath = path.join(dirName, `${baseName}.${format}`);
        const relativePath = path.relative(__dirname, inputPath);

        // Check if output file exists
        if (!this.force && await this.fileExists(outputPath)) {
            if (this.dryRun) {
                console.log(`  ${relativePath} → ${baseName}.${format} (exists - would skip)`);
            } else {
                const indexStr = String(index).padStart(PAD_START);
                const totalStr = String(total).padStart(PAD_START);
                console.log(`⊘ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (exists)`);
            }
            this.stats.skipped++;
            return { success: false, skipped: true };
        }

        if (this.dryRun) {
            let quality;
            if (type === 'png') {
                quality = format === 'avif' ? this.pngAvifQuality : this.pngWebpQuality;
            } else {
                quality = format === 'avif' ? this.jpegAvifQuality : this.jpegWebpQuality;
            }
            console.log(`  ${relativePath} → ${baseName}.${format} (quality ${quality})`);
            return { success: true, size: 0 };
        }

        // Get initial quality based on format and type
        let currentQuality;
        if (type === 'png') {
            currentQuality = format === 'avif' ? this.pngAvifQuality : this.pngWebpQuality;
        } else {
            currentQuality = format === 'avif' ? this.jpegAvifQuality : this.jpegWebpQuality;
        }

        const initialQuality = currentQuality;
        const inputStats = await fs.stat(inputPath);
        const indexStr = String(index).padStart(PAD_START);
        const totalStr = String(total).padStart(PAD_START);

        // Iterative conversion with quality reduction
        let attempt = 0;
        const maxAttempts = currentQuality; // Can reduce quality down to 1

        while (attempt < maxAttempts) {
            attempt++;

            try {
                const converter = sharp(inputPath);

                if (format === 'avif') {
                    await converter.avif({
                        quality: currentQuality,
                        effort: AVIF_MAX_EFFORT,
                    }).toFile(outputPath);
                } else if (format === 'webp') {
                    if (type === 'png') {
                        await converter.webp({
                            quality: currentQuality,
                            nearLossless: true,
                            effort: WEBP_MAX_EFFORT,
                        }).toFile(outputPath);
                    } else {
                        await converter.webp({
                            quality: currentQuality,
                            effort: WEBP_MAX_EFFORT,
                        }).toFile(outputPath);
                    }
                }

                const outputStats = await fs.stat(outputPath);

                // Check for zero-length file
                if (outputStats.size === 0) {
                    await fs.unlink(outputPath);
                    console.error(`✗ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (zero-length file)`);
                    this.stats.errors++;
                    return { success: false, size: 0, error: 'Zero-length file generated' };
                }

                // Determine target size based on format
                let targetSize;
                let targetDescription;

                if (format === 'avif' && webpSize !== null) {
                    // AVIF must be smaller than WEBP
                    targetSize = webpSize;
                    targetDescription = 'WEBP';
                } else {
                    // Must be smaller than original
                    targetSize = inputStats.size;
                    targetDescription = 'original';
                }

                // Check if output is acceptable
                if (outputStats.size < targetSize) {
                    // Success! File is smaller than target
                    if (format === 'avif') {
                        this.stats.avifCreated++;
                    } else if (format === 'webp') {
                        this.stats.webpCreated++;
                    }

                    const savedBytes = inputStats.size - outputStats.size;
                    const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(2);
                    const percentStr = savedPercent.padStart(5);

                    let qualityInfo = '';
                    if (currentQuality !== initialQuality) {
                        qualityInfo = ` (quality reduced: ${initialQuality} → ${currentQuality})`;
                        this.stats.qualityReduced.push({
                            file: relativePath,
                            format: format,
                            initialQuality: initialQuality,
                            finalQuality: currentQuality,
                            attempts: attempt,
                            originalSize: inputStats.size,
                            finalSize: outputStats.size,
                            targetSize: targetSize,
                            targetDescription: targetDescription,
                        });
                    }

                    console.log(`✓ [${indexStr} / ${totalStr}] (-${percentStr}%) ${relativePath} → ${baseName}.${format}${qualityInfo}`);
                    return { success: true, size: outputStats.size, quality: currentQuality };
                }

                // Output is too large, try reducing quality
                if (currentQuality > 1) {
                    // Log the failed attempt
                    console.log(`  [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} quality ${currentQuality}: ${outputStats.size} >= ${targetSize} (${targetDescription}), trying quality ${currentQuality - 1}...`);
                    await fs.unlink(outputPath);
                    currentQuality--;
                    // Continue loop to try again with lower quality
                } else {
                    // Already at minimum quality, give up
                    await fs.unlink(outputPath);

                    if (format === 'avif' && webpSize !== null) {
                        console.log(`⊘ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (larger than WEBP even at quality 1: ${outputStats.size} >= ${webpSize})`);
                        this.stats.avifSkippedLargerThanWebp++;
                    } else {
                        console.log(`⊘ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (larger than ${targetDescription} even at quality 1: ${outputStats.size} >= ${targetSize})`);
                        this.stats.skippedLarger++;
                    }

                    return { success: false, size: 0 };
                }
            } catch (error) {
                console.error(`✗ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (${error.message})`);
                this.stats.errors++;
                return { success: false, size: 0, error: error.message };
            }
        }

        // Should not reach here, but handle it anyway
        console.log(`⊘ [${indexStr} / ${totalStr}] ${relativePath} → ${baseName}.${format} (max attempts reached)`);
        this.stats.skippedLarger++;
        return { success: false, size: 0 };
    }

    /**
     * Check if file exists
     */
    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Print conversion summary
     */
    printSummary() {
        console.log();
        console.log(this.dryRun ? 'Summary (DRY RUN)' : 'Conversion Summary');
        console.log('='.repeat(this.dryRun ? 17 : 18));

        if (this.dryRun) {
            const pngConversions = this.stats.pngFound * 2;
            const jpegConversions = this.stats.jpegFound * 2;
            const total = pngConversions + jpegConversions;

            console.log(`PNG files: ${this.stats.pngFound} → ${pngConversions} conversions (${this.stats.pngFound} AVIF + ${this.stats.pngFound} WEBP)`);
            console.log(`JPEG files: ${this.stats.jpegFound} → ${jpegConversions} conversions (${this.stats.jpegFound} AVIF + ${this.stats.jpegFound} WEBP)`);
            console.log(`Total: ${total} conversions would be performed`);
            if (this.stats.skipped > 0) {
                console.log(`Files that would be skipped: ${this.stats.skipped}`);
            }
        } else {
            console.log(`PNG files found: ${this.stats.pngFound}`);
            console.log(`JPEG files found: ${this.stats.jpegFound}`);
            console.log(`AVIF files created: ${this.stats.avifCreated}`);
            console.log(`WEBP files created: ${this.stats.webpCreated}`);
            if (this.stats.skipped > 0) {
                console.log(`Files skipped: ${this.stats.skipped} (already exist)`);
            }
            if (this.stats.skippedLarger > 0) {
                console.log(`Files skipped: ${this.stats.skippedLarger} (larger than original)`);
            }
            if (this.stats.avifSkippedLargerThanWebp > 0) {
                console.log(`AVIF skipped: ${this.stats.avifSkippedLargerThanWebp} (larger than WEBP)`);
            }
            if (this.stats.cacheHits > 0) {
                console.log(`Cache hits: ${this.stats.cacheHits} (already processed)`);
            }
            if (this.stats.errors > 0) {
                console.log(`Errors: ${this.stats.errors}`);
            }

            // Report files with reduced quality
            if (this.stats.qualityReduced.length > 0) {
                console.log();
                console.log('Quality Reduced Files (Please Verify Visually)');
                console.log('='.repeat(47));
                console.log();
                console.log('The following files required quality reduction to achieve smaller file size:');
                console.log();

                for (const item of this.stats.qualityReduced) {
                    const savedBytes = item.originalSize - item.finalSize;
                    const savedPercent = ((savedBytes / item.originalSize) * 100).toFixed(2);

                    console.log(`File: ${item.file}`);
                    console.log(`  Format: ${item.format.toUpperCase()}`);
                    console.log(`  Quality: ${item.initialQuality} → ${item.finalQuality} (reduced by ${item.initialQuality - item.finalQuality})`);
                    console.log(`  Attempts: ${item.attempts}`);
                    console.log(`  Original size: ${item.originalSize} bytes`);
                    console.log(`  Target (${item.targetDescription}): ${item.targetSize} bytes`);
                    console.log(`  Final size: ${item.finalSize} bytes (-${savedPercent}%)`);
                    console.log();
                }

                console.log(`Total files with reduced quality: ${this.stats.qualityReduced.length}`);
                console.log();
                console.log('⚠️  IMPORTANT: Please visually inspect these files to ensure quality is acceptable.');
            }
        }
    }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        dryRun: false,
        force: false,
        pngAvifQuality: DEFAULT_PNG_AVIF_QUALITY,
        pngWebpQuality: DEFAULT_PNG_WEBP_QUALITY,
        jpegAvifQuality: DEFAULT_JPEG_AVIF_QUALITY,
        jpegWebpQuality: DEFAULT_JPEG_WEBP_QUALITY,
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--dry-run') {
            options.dryRun = true;
        } else if (arg === '--force') {
            options.force = true;
        } else if (arg === '--png-avif-quality') {
            const quality = parseInt(args[++i], 10);
            if (isNaN(quality) || quality < 1 || quality > 100) {
                console.error('Error: PNG AVIF quality must be a number between 1 and 100');
                process.exit(1);
            }
            options.pngAvifQuality = quality;
        } else if (arg === '--png-webp-quality') {
            const quality = parseInt(args[++i], 10);
            if (isNaN(quality) || quality < 1 || quality > 100) {
                console.error('Error: PNG WEBP quality must be a number between 1 and 100');
                process.exit(1);
            }
            options.pngWebpQuality = quality;
        } else if (arg === '--jpeg-avif-quality') {
            const quality = parseInt(args[++i], 10);
            if (isNaN(quality) || quality < 1 || quality > 100) {
                console.error('Error: JPEG AVIF quality must be a number between 1 and 100');
                process.exit(1);
            }
            options.jpegAvifQuality = quality;
        } else if (arg === '--jpeg-webp-quality') {
            const quality = parseInt(args[++i], 10);
            if (isNaN(quality) || quality < 1 || quality > 100) {
                console.error('Error: JPEG WEBP quality must be a number between 1 and 100');
                process.exit(1);
            }
            options.jpegWebpQuality = quality;
        } else if (arg === '--help') {
            showHelp();
            process.exit(0);
        } else {
            console.error(`Error: Unknown option: ${arg}`);
            showHelp();
            process.exit(1);
        }
    }

    return options;
}

/**
 * Show help message
 */
function showHelp() {
    console.log(`
Image Conversion Script

Converts PNG and JPEG images to AVIF and WEBP formats.

Usage:
  node convert-images.js [options]

Options:
  --dry-run                 Show what would be converted without converting
  --force                   Reconvert existing AVIF/WEBP files
  --png-avif-quality <n>    PNG to AVIF quality (1-100, default: ${DEFAULT_PNG_AVIF_QUALITY})
  --png-webp-quality <n>    PNG to WEBP quality (1-100, default: ${DEFAULT_PNG_WEBP_QUALITY})
  --jpeg-avif-quality <n>   JPEG to AVIF quality (1-100, default: ${DEFAULT_JPEG_AVIF_QUALITY})
  --jpeg-webp-quality <n>   JPEG to WEBP quality (1-100, default: ${DEFAULT_JPEG_WEBP_QUALITY})
  --help                    Show this help message

Examples:
  node convert-images.js
  node convert-images.js --dry-run
  node convert-images.js --force
  node convert-images.js --png-avif-quality 85 --png-webp-quality 90
  node convert-images.js --jpeg-avif-quality 80 --jpeg-webp-quality 85

Conversion Settings:
  - PNG → AVIF: Quality ${DEFAULT_PNG_AVIF_QUALITY} (effort ${AVIF_MAX_EFFORT})
  - PNG → WEBP: Quality ${DEFAULT_PNG_WEBP_QUALITY} (effort ${WEBP_MAX_EFFORT} with nearLossless)
  - JPEG → AVIF: Quality ${DEFAULT_JPEG_AVIF_QUALITY} (effort ${AVIF_MAX_EFFORT})
  - JPEG → WEBP: Quality ${DEFAULT_JPEG_WEBP_QUALITY} (effort ${WEBP_MAX_EFFORT})
  - Original files are preserved
  - AVIF only kept if smaller than WEBP
`);
}

/**
 * Main entry point
 */
async function main() {
    const startTime = Date.now();

    try {
        const options = parseArgs();
        const converter = new ImageConverter(options);
        await converter.convert();

        if (!options.dryRun) {
            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            console.log(`Total time: ${duration}s`);
        }
    } catch (error) {
        console.error('Conversion failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { ImageConverter };