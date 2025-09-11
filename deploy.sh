#!/bin/bash

# Deployment script for Google Cloud App Engine
# This script ensures all files are properly built and deployed

echo "🚀 Starting deployment to Google Cloud App Engine..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Verify all image files exist before deployment
echo "🖼️ Verifying image files..."
echo "Checking public/images structure:"
find public/images -type f -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" | head -20

# Count total image files
IMAGE_COUNT=$(find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | wc -l)
echo "📊 Total image files found: $IMAGE_COUNT"

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Verify files are ready for deployment
echo "📋 Files ready for deployment:"
echo "- public/ directory size: $(du -sh public/ | cut -f1)"
echo "- .next/ directory size: $(du -sh .next/ | cut -f1)"

# Deploy to Google Cloud App Engine
echo "☁️ Deploying to Google Cloud App Engine..."
gcloud app deploy --quiet --verbosity=info

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your app is now live at: https://your-project-id.appspot.com"
    echo "🔍 Verifying deployed images..."
    echo "Testing image accessibility..."
    curl -I https://hankyliu.com/images/avatar.jpg
    curl -I https://hankyliu.com/images/blog/1.jpg
else
    echo "❌ Deployment failed! Please check the logs for more details."
    exit 1
fi
