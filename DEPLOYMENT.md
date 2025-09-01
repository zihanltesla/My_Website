# Deployment Guide

## Automated Deployment with GitHub Actions

### Prerequisites
1. Google Cloud project created
2. App Engine enabled in your project
3. Service account with App Engine deployment permissions

### Setting up GitHub Secrets

1. **Add OpenAI API Key**:
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `OPENAI_API_KEY`
   - Value: `your_openai_api_key_here`

2. **Add Google Cloud Service Account** (for deployment):
   - Create a service account in Google Cloud Console
   - Download the JSON key file
   - Add it as a GitHub secret named `GCP_SERVICE_CREDENTIALS`

### Automatic Deployment

The deployment happens automatically when you push to the `main` branch. The GitHub Actions workflow will:
1. Build the Next.js application
2. Deploy to Google App Engine
3. Set environment variables securely

### Deploy Commands

```bash
# Build the application
npm run build

# Deploy to App Engine
gcloud app deploy

# View your deployed app
gcloud app browse
```

### Alternative: Using .env file in deployment

If you prefer to use a .env file approach, you can create a `app.prod.yaml` file:

```yaml
runtime: nodejs20

env_variables:
  OPENAI_API_KEY: "your_key_here"

automatic_scaling:
  min_instances: 0
  max_instances: 10
```

Then deploy with:
```bash
gcloud app deploy app.prod.yaml
```

**Important**: Never commit files containing API keys to version control.

## Local Development

For local development, use `.env.local`:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your API key
OPENAI_API_KEY=your_openai_api_key_here
```

## Security Notes

- API keys should never be committed to version control
- Use environment variables for sensitive configuration
- Consider using Google Cloud Secret Manager for production deployments
- The `.env.local` file is already in `.gitignore` and won't be committed
