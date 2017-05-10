const settings = {};

settings.default = {
  port: 8000,
  database: { uri: 'mongodb://localhost/react-challenge' },
};

module.exports = Object.assign({}, settings.default);

