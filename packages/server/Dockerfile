# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 