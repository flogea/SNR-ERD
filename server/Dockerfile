# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
ARG APP_DIR=app_server
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application to listen on
EXPOSE 5000

# Start the application
CMD [ "npm", "run", "server" ]
