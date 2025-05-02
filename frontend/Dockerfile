FROM node:22 AS build

# Build stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Start nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
