# Use Node.js image to build the application
FROM node:20 AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first
COPY package.json pnpm-lock.yaml ./ 

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Use a lightweight Nginx image to serve the application
FROM nginx:stable-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
