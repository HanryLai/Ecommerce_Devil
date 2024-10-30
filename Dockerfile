FROM node:21

# Install pnpm
RUN npm install -g pnpm
# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3030

# Command to run the application
CMD ["pnpm", "run", "start:dev"]