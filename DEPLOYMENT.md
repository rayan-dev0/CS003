# Deployment Guide for Vercel

This guide will help you deploy the entire monorepo to Vercel, including the seller panel, admin panel, and server.

## Prerequisites

1. A Vercel account
2. The Vercel CLI installed (`npm install -g vercel`)
3. Your monorepo code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, you need to set up the following environment variables in your Vercel project:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js |
| `NEXT_PUBLIC_BACKEND_URI` | URL of your backend API |
| `NEXT_PUBLIC_ADMIN_SECRET_KEY` | Admin secret key for authentication |
| `ADMIN_USER` | Admin username (for admin panel) |
| `ADMIN_PASSWORD` | Admin password (for admin panel) |
| `AUTH_SECRET` | Authentication secret (for admin panel) |
| `AZURE_STORAGE_CONNECTION_STRING` | Azure Storage connection string |
| `AZURE_STORAGE_CONTAINER_NAME` | Azure Storage container name |

## Deployment Steps

### Option 1: Using Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your project.

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: pnpm build
   - Output Directory: apps/seller-panel/.next
4. Add the environment variables mentioned above
5. Deploy

## Project Structure

The monorepo consists of three main parts:

1. **Seller Panel** (`apps/seller-panel`): Next.js application for sellers
2. **Admin Panel** (`apps/admin-panel`): Next.js application for administrators
3. **Server** (`packages/server`): Express.js backend API

## Accessing the Applications

After deployment, you can access the applications at:

- Seller Panel: `https://your-vercel-domain.vercel.app/seller-panel`
- Admin Panel: `https://your-vercel-domain.vercel.app/admin-panel`
- API: `https://your-vercel-domain.vercel.app/api`

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for errors
2. Ensure all environment variables are correctly set
3. Verify that your MongoDB database is accessible from Vercel's servers
4. Check that your Azure Storage account is properly configured

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/) 