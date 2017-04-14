module.exports = (client, config) => {
  return {
    currencies: () => {
      return client.getRequest(['currency', 'currencies']);
    }
  };
};
