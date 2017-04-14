module.exports = (client, config) => {
  return {
    launch: providedParams => {
      // Override default params
      const params = Object.assign({
        "appVersion": "6.3.0",
        "language": "en",
        "platform": "Android",
        "platformVersion": "6.0",
        "resolution": "1080x1794",
        "scale": "1"
      }, providedParams);
      // And post the request
      return client.postRequest(['launch', 'launch'], params);
    } 
  };
};
