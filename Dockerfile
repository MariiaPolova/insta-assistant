# Use the official Node.js image as the base image
FROM node:18-alpine

# Declare build args (values come from Cloud Build `--build-arg`)
ARG NODE_ENV
ARG NEXT_PUBLIC_API_URL
ARG API_URL

# Set runtime env vars (these get baked into the container image)
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=test123
ENV API_URL=123testapiurl

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -only=production

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]