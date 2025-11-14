/**
 * Quality Testing Script
 *
 * Generates multiple versions of an image with different quality settings
 * to help determine the optimal quality level.
 *
 * Usage:
 *   node test-quality.js <image-path>
 *
 * Example:
 *   node test-quality.js free/fuel-mode-fuel-left-popup.png
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Quality levels to test
const QUALITY_LEVELS = [90, 80, 70, 60, 50, 40, 30, 20, 10];

// Compression settings
const AVIF_MAX_EFFORT = 9;
const WEBP_MAX_EFFORT = 6;

async function testQuality(imagePath) {
    // Check if file exists
    try {
        await fs.access(imagePath);
    } catch (error) {
        console.error(`Error: File not found: ${imagePath}`);
        process.exit(1);
    }

    const ext = path.extname(imagePath).toLowerCase();
    const baseName = path.basename(imagePath, ext);
    const dirName = path.dirname(imagePath);

    console.log('Quality Testing Script');
    console.log('=====================');
    console.log();
    console.log(`Input file: ${imagePath}`);
    console.log(`Testing quality levels: ${QUALITY_LEVELS.join(', ')}`);
    console.log();

    // Get original file size
    const originalStats = await fs.stat(imagePath);
    console.log(`Original size: ${formatBytes(originalStats.size)}`);
    console.log();

    const results = {
        avif: [],
        webp: [],
    };

    // Test AVIF
    console.log('Generating AVIF versions...');

    for (const quality of QUALITY_LEVELS) {
        const outputPath = path.join(dirName, `${baseName}-${quality}.avif`);

        try {
            await sharp(imagePath)
                .avif({
                    quality,
                    effort: AVIF_MAX_EFFORT,
                })
                .toFile(outputPath);

            const stats = await fs.stat(outputPath);
            const savings = ((1 - stats.size / originalStats.size) * 100).toFixed(1);

            results.avif.push({
                quality,
                size: stats.size,
                savings,
                path: outputPath,
            });

            console.log(`  Quality ${quality}: ${formatBytes(stats.size)} (${savings}% savings)`);
        } catch (error) {
            console.error(`  Quality ${quality}: Error - ${error.message}`);
        }
    }

    console.log();

    // Test WEBP
    console.log('Generating WEBP versions...');
    for (const quality of QUALITY_LEVELS) {
        const outputPath = path.join(dirName, `${baseName}-${quality}.webp`);

        try {
            await sharp(imagePath)
                .webp({
                    quality,
                    effort: WEBP_MAX_EFFORT,
                })
                .toFile(outputPath);

            const stats = await fs.stat(outputPath);
            const savings = ((1 - stats.size / originalStats.size) * 100).toFixed(1);

            results.webp.push({
                quality,
                size: stats.size,
                savings,
                path: outputPath,
            });

            console.log(`  Quality ${quality}: ${formatBytes(stats.size)} (${savings}% savings)`);
        } catch (error) {
            console.error(`  Quality ${quality}: Error - ${error.message}`);
        }
    }

    console.log();
    console.log('Summary');
    console.log('=======');
    console.log();

    // Print comparison table
    console.log('Quality | AVIF Size | AVIF Savings | WEBP Size | WEBP Savings');
    console.log('--------|-----------|--------------|-----------|-------------');

    for (let i = 0; i < QUALITY_LEVELS.length; i++) {
        const quality = QUALITY_LEVELS[i];
        const avif = results.avif[i];
        const webp = results.webp[i];

        if (avif && webp) {
            console.log(
                `${quality.toString().padStart(7)} | ` +
                `${formatBytes(avif.size).padStart(9)} | ` +
                `${(avif.savings + '%').padStart(12)} | ` +
                `${formatBytes(webp.size).padStart(9)} | ` +
                `${(webp.savings + '%').padStart(12)}`
            );
        }
    }

    console.log();
    console.log('Generated files:');
    console.log(`  AVIF: ${results.avif.length} files`);
    console.log(`  WEBP: ${results.webp.length} files`);
    console.log();
    console.log('To clean up test files:');
    console.log(`  rm ${dirName}/${baseName}-*.avif ${dirName}/${baseName}-*.webp`);
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Main
const imagePath = process.argv[2];

if (!imagePath) {
    console.error('Usage: node test-quality.js <image-path>');
    console.error('Example: node test-quality.js free/fuel-mode-fuel-left-popup.png');
    process.exit(1);
}

testQuality(imagePath).catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
});