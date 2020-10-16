FROM node:latest

EXPOSE 8020
WORKDIR /usr/src/app

# Copy source project
COPY . /usr/src/app

# Install Dependencies
RUN npm install
RUN npm install --global serve

# Build Static Website
RUN npm run build

CMD serve dist -l 8020
