const assert = require('assert');

module.exports = (client, config) => {
  return {
    logonpin: params => {
      assert.ok(params.userId, 'Missing userId');
      assert.ok(params.pin, 'Missing pin');
      return client.postRequest(['logon', 'logonpin'], params);
    },
    selectagreement: params => {
      assert.ok(params.agreementNumber, 'Missing agreementNumber');
      assert.ok(params.userNumber, 'Missing userNumber');
      return client.postRequest(['logon', 'selectagreement'], params);
    }
  };
};
