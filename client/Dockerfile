# Development stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5174

# Start the application in development mode
# --host 0.0.0.0 is required for Docker
# --port 5174 to match the docker-compose mapping
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]
