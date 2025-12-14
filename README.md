# VoyahChat Content

voyahchat.ru content files

## Image Conversion

This repository includes a script to generate modern image formats (AVIF and WEBP) from PNG and JPEG files.

### Installation

```bash
npm install
```

### Usage

#### Convert all images
```bash
npm run convert:images
```

#### Preview without converting (dry run)
```bash
npm run convert:images:dry-run
```

#### Force reconversion of existing files
```bash
npm run convert:images:force
```

#### Custom quality settings
```bash
# PNG to AVIF quality
node convert-images.js --png-avif-quality 85

# PNG to WEBP quality
node convert-images.js --png-webp-quality 90

# JPEG to AVIF quality
node convert-images.js --jpeg-avif-quality 80

# JPEG to WEBP quality
node convert-images.js --jpeg-webp-quality 85

# Combine multiple settings
node convert-images.js --png-avif-quality 85 --png-webp-quality 90
```

### Conversion Settings

    - **PNG → AVIF**: Quality 50 with maximum compression effort
    - **PNG → WEBP**: Quality 90 with maximum compression effort (nearLossless)
    - **JPEG → AVIF**: Quality 50 with maximum compression effort
    - **JPEG → WEBP**: Quality 90 with maximum compression effort
    - **Original files**: Always preserved alongside generated formats
    - **Existing files**: Skipped by default (use `--force` to reconvert)
    - **Size optimization**:
    - Converted files larger than originals are automatically discarded
    - AVIF files larger than WEBP are automatically discarded (WEBP is kept)
    - **Caching**: Processed files are cached to avoid reprocessing (stored in `.conversion-cache.json`)

### Technical Details

    - AVIF compression effort: 9 (maximum, 0-9 scale)
    - WEBP compression effort: 6 (maximum, 0-6 scale) with nearLossless for PNG
    - Default quality settings:
    - PNG → AVIF: 50 (configurable via `--png-avif-quality`)
    - PNG → WEBP: 90 (configurable via `--png-webp-quality`)
    - JPEG → AVIF: 50 (configurable via `--jpeg-avif-quality`)
    - JPEG → WEBP: 90 (configurable via `--jpeg-webp-quality`)
    - Batch processing: 10 images at a time to manage memory usage
    - Conversion order: WEBP first, then AVIF (only if AVIF is smaller than WEBP)
    - Cache file: `convert-images.json` (automatically managed, add to `.gitignore`)

### Requirements

    - Node.js 18 or higher
    - Sharp library (installed automatically via npm install)

### Command Line Options

| Option | Description |
|--------|-------------|
| `--dry-run` | Show what would be converted without actually converting |
| `--force` | Reconvert existing AVIF/WEBP files |
| `--png-avif-quality <n>` | PNG to AVIF quality (1-100, default: 50) |
| `--png-webp-quality <n>` | PNG to WEBP quality (1-100, default: 90) |
| `--jpeg-avif-quality <n>` | JPEG to AVIF quality (1-100, default: 50) |
| `--jpeg-webp-quality <n>` | JPEG to WEBP quality (1-100, default: 90) |
| `--help` | Show help message |

### Examples

```bash
# Basic conversion
npm run convert:images

# See what would be converted
npm run convert:images:dry-run

# Reconvert all files
npm run convert:images:force

# Use custom quality settings
node convert-images.js --png-avif-quality 85 --png-webp-quality 90
node convert-images.js --jpeg-avif-quality 80 --jpeg-webp-quality 85

# Show help
node convert-images.js --help

# Test different quality levels for a single image
node convert-images-test-quality.js free/fuel-mode-fuel-left-popup.png
```

### Quality Testing

Use the `convert-images-test-quality.js` script to test different quality levels on a single image:

```bash
node convert-images-test-quality.js <image-path>
```

This will generate versions of the image at quality levels 90, 80, 70, 60, 50, 40, 30, 20, and 10 for both AVIF and WEBP formats. The script outputs a comparison table showing file sizes and savings for each quality level.

Example output:
```
Quality | AVIF Size | AVIF Savings | WEBP Size | WEBP Savings
--------|-----------|--------------|-----------|-------------
     90 |   52.9 KB |        82.5% |   51.8 KB |        82.9%
     80 |   32.5 KB |        89.2% |   35.9 KB |        88.1%
     70 |   25.9 KB |        91.4% |   29.4 KB |        90.3%
```

Clean up test files:
```bash
rm <directory>/<basename>-*.avif <directory>/<basename>-*.webp
```

### Output

The script will:
1. Scan `common/`, `free/`, `dreamer/`, and `passion/` directories
2. Find all PNG and JPEG files
3. Convert each to AVIF and WEBP formats
4. Place converted files alongside originals
5. Report conversion statistics

Example output:
```
Image Conversion Script
=======================

Scanning directories...
Found 45 PNG files
Found 3 JPEG files

Converting images...
[1/96] common/image.png → image.avif ✓ (saved 45.2%)
[2/96] common/image.png → image.webp ✓ (saved 38.1%)
[3/96] free/photo.jpg → photo.avif ✓ (saved 12.5%)
[4/96] free/screenshot.png → screenshot.avif (skipped - larger than original)
...

Conversion Summary
==================
PNG files found: 45
JPEG files found: 3
AVIF files created: 38
WEBP files created: 46
Files skipped: 0 (already exist)
Files skipped: 6 (larger than original)
AVIF skipped: 4 (larger than WEBP)
Cache hits: 0 (already processed)
Errors: 0
Total time: 94.2s
