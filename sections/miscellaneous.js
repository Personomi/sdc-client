// TODO: Implement miscellaneous/widget/configuration

module.exports = (client, config) => {
  return {
    atms: () => {
      return client.getRequest(['miscellaneous', 'atms']);
    },
    branches: () => {
      return client.getRequest(['miscellaneous', 'branches']);
    },
    siteInformation: () => {
      return client.getRequest(['miscellaneous', 'siteInformation']);
    },
    overview: () => {
      return client.getRequest(['miscellaneous', 'overview']);
    },
    bankingdays: () => {
      return client.getRequest(['miscellaneous', 'bankingdays']);
    }
  };
};
