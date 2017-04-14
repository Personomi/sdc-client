const assert = require('assert');
const querystring = require('querystring');

const winston = require('winston');
winston.cli();
winston.name = 'sdc-client';

const request = require('request-promise');
const jar = request.jar();

const DEFAULT_CONFIG = {
  baseUrl: 'https://prod.smartdk.sdc.dk',
  apiVersion: 1,
  locale: 'en_GB',
  clientType: 'smartphone'
};

module.exports = providedConfig => {
  const config = Object.assign({}, DEFAULT_CONFIG, providedConfig);
  // Build the client object
  const client = {
    checkConfig: () => {
      assert.ok(config.apiVersion, 'Missing a apiVersion');
      assert.ok(config.bankRegistrationNumber,
                'Missing a bankRegistrationNumber');
      assert.ok(config.baseUrl, 'Missing a baseUrl');
      assert.ok(config.clientType, 'Missing a clientType');
      assert.ok(config.locale, 'Missing a locale');
    },
    buildUrl: (action, params) => {
      const qs = params ? '?' + querystring.stringify(params) : '';
      return [
        config.baseUrl,
        'restapi',
        config.bankRegistrationNumber
      ].concat(action).join('/') + qs;
    },
    buildHeaders: () => {
      return {
        'X-SDC-API-VERSION': config.apiVersion,
        'X-SDC-CLIENT-TYPE': config.clientType,
        'X-SDC-LOCALE': config.locate
      };
    },
    request: params => {
      winston.debug('Requesting ' + params.url, params);
      return request(params);
    },
    getRequest: (action, params) => {
      return client.request({
        url: client.buildUrl(action, params),
        method: 'GET',
        jar: jar,
        json: true,
        headers: client.buildHeaders()
      });
    },
    postRequest: (action, params) => {
      return client.request({
        url: client.buildUrl(action),
        method: 'POST',
        jar: jar,
        json: true,
        body: params,
        headers: client.buildHeaders()
      });
    },
    getSessionId: () => {
      const cookies = jar.getCookies('http://prod.smartdk.sdc.dk');
      const cookie = cookies.find(cookie => {
        return cookie.key === 'RESTSMARTPHONESESSIONID';
      });
      return cookie.value;
    }
  };

  Object.assign(client, {
    accounts: require('./sections/accounts')(client, config),
    currency: require('./sections/currency')(client, config),
    launch: require('./sections/launch')(client, config),
    logon: require('./sections/logon')(client, config),
    miscellaneous: require('./sections/miscellaneous')(client, config)
  });

  // TODO: Implement ecard/unpaid/list
  // TODO: Implement outbox/list
  // TODO: Implement payment/agreements?withMeta=true
  // TODO: Implement cards/

  client.checkConfig();

  return client;
};
