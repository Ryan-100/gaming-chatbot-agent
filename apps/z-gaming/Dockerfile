# Stage 1: Build Stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/backend

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .
    
# Build the application
RUN npx nx reset && npx nx build z-gaming

# Stage 2: Production Stage
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/backend

COPY --from=build /usr/src/backend/ ./

# Expose the port your app runs on
EXPOSE 8000

# Command to run the application
CMD ["sh", "-c", "NX_REJECT_UNKNOWN_LOCAL_CACHE=0 npx nx start z-gaming"]