FROM cypress/browsers:node-18.14.1-chrome-110.0.5481.96-1-ff-109.0-edge-110.0.1587.41-1
COPY . . 
RUN yarn install
WORKDIR /e2e
CMD ["yarn", "cypress", "run"]