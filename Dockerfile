# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Copy wait-for-it script
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Start the application
CMD ["./wait-for-it.sh", "kafka:9092", "--", "node", "dist/app.js"] 