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

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Google Cloud App Engine
echo "☁️ Deploying to Google Cloud App Engine..."
gcloud app deploy --quiet

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your app is now live at: https://your-project-id.appspot.com"
else
    echo "❌ Deployment failed! Please check the logs for more details."
    exit 1
fi
