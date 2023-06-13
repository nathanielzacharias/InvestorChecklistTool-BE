# uses Alpine Linux as base image (https://hub.docker.com/_/node/) 
FROM node:alpine

# Create app directory 
# -p flag creates parent directory if does not exist. If exists, proceeds to create subdirectories within. 
# -R does chown recursively, node:node is newUser:newGroup
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

# Set working directory
WORKDIR /usr/src/node-app

# Copies 2 files from local to Docker's WORKDIR, versions are locked in yarn.lock
COPY package.json yarn.lock ./

# Set user to node
USER node

# Install dependencies, --pure-lockfile reads from yarn.lock, does not generate a new lockfile, ensures reproducible builds
RUN yarn install --pure-lockfile

# Bundle app source, . . copies all files from current directory (locally) to Docker's WORKDIR
COPY --chown=node:node . .

# Exposes port 3000 to other Docker containers, used in multi-container Docker applications
# EXPOSE does not make the ports of the container accessible to the host.
# EXPOSE 3000
