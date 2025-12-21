# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev) for build
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app (build-time env vars need to be available here)
# For NEXT_PUBLIC_ vars, you might need them at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Optionally, prune dev dependencies after build
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]