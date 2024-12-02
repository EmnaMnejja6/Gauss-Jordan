const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gauss-jordan',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

