#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Image optimization settings
const OPTIMIZATION_SETTINGS = {
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true
  },
  webp: {
    quality: 80, // Reduced for better compression
    effort: 6,
    lossless: false,
    nearLossless: false,
    smartSubsample: true
  },
  avif: {
    quality: 75,
    effort: 6 // Increased effort for better compression
  }
};

async function optimizeImage(inputPath, outputPath, format = 'webp') {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizing: ${path.relative(process.cwd(), inputPath)}`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);
    
    let pipeline = image;
    
    // Resize if too large
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, { 
        withoutEnlargement: true,
        fastShrinkOnLoad: true 
      });
    }
    
    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp(OPTIMIZATION_SETTINGS.webp);
        break;
      case 'avif':
        pipeline = pipeline.avif(OPTIMIZATION_SETTINGS.avif);
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg(OPTIMIZATION_SETTINGS.jpeg);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
    
    await pipeline.toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const dirName = path.dirname(fullPath);
        
        // Generate WebP version
        const webpPath = path.join(dirName, `${baseName}.webp`);
        if (!fs.existsSync(webpPath)) {
          await optimizeImage(fullPath, webpPath, 'webp');
        }
        
        // Optionally generate AVIF version for even better compression
        // const avifPath = path.join(dirName, `${baseName}.avif`);
        // if (!fs.existsSync(avifPath)) {
        //   await optimizeImage(fullPath, avifPath, 'avif');
        // }
      }
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...');
  console.log(`📁 Processing directory: ${IMAGES_DIR}`);
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }
  
  await processDirectory(IMAGES_DIR);
  
  console.log('✅ Image optimization complete!');
  console.log('💡 Tip: Update your components to use the new WebP images for better performance.');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, processDirectory };
