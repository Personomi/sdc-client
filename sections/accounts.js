const assert = require('assert');

module.exports = (client, config) => {
  return {
    list: () => {
      // TODO: Implement ?clearCache=false
      return client.getRequest(['accounts', 'list']);
    },
    transactions: {
      search: params => {
        assert.ok(params.accountId, 'Missing accountId');
        assert.ok(params.agreementId, 'Missing agreementId');
        assert.ok(params.includeReservations, 'Missing includeReservations');
        assert.ok(params.transactionsFrom, 'Missing transactionsFrom');
        assert.ok(params.transactionsTo, 'Missing transactionsTo');
        return client.postRequest([
          'accounts', 'transactions', 'search'
        ], params);
        /*
        {
          "amount": {
            "currency": "DKK",
            "localizedValue": "-1,020.00",
            "localizedValueWithCurrency": "-1,020.00 DKK",
            "localizedValueWithCurrencyAtEnd": "-1,020.00 DKK",
            "roundedAmountWithCurrencySymbol": "-1,020 DKK",
            "roundedAmountWithIsoCurrency": "-DKK1,020",
            "scale": 2,
            "value": -102000
          },
          "balance": {
            "currency": "DKK",
            "localizedValue": "-2,020.00",
            "localizedValueWithCurrency": "-2,020.00 DKK",
            "localizedValueWithCurrencyAtEnd": "-2,020.00 DKK",
            "roundedAmountWithCurrencySymbol": "-2,020 DKK",
            "roundedAmountWithIsoCurrency": "-DKK2,020",
            "scale": 2,
            "value": -202000
          },
          "categoryLabel": null,
          "clearingChoice": "Unknown",
          "dueDate": "2017-01-01",
          "entityKey": {
            "accountId": "400.4012345678",
            "afrIdfr": "040012345678910",
            "agreementId": "040012345678910",
            "amount": "-102000",
            "balance": "-202000",
            "dtCreate": "2017-01-01",
            "hostTms": "2017-01-01-22.00.00.123456",
            "ldbId": "01200",
            "ownText": "",
            "paymentDate": "2017-01-01",
            "pccgHostTs": "",
            "pciHostTimeStamp": "0000-00-00-00.00.00.000000",
            "pstgWsId": "YADG1234",
            "refNumber": "0123456789"
          },
          "icon": null,
          "label": "Dankort-køb MobilePay Nota 0123456789",
          "originalText": "",
          "paymentDate": "2017-01-01",
          "subCategoryLabel": null
        }
        */
      }
    }
  };
};
