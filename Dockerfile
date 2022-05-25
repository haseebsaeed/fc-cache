FROM node:gallium-alpine

## Set log level info
ENV NPM_CONFIG_LOGLEVEL info

## Set environment to "production" by default
ENV NODE_ENV development

# Create app directory
WORKDIR /fc-cache-server

COPY package*.json .

RUN npm install --no-optional

# Bundle app source
COPY . .
	
CMD ["npm", "run", "start"]