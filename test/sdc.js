const assert = require('assert');
const sdc = require('..');

module.exports = (client, credentials) => {

  describe('sdc-client', function() {

    describe('launch', function() {
      it('will set the RESTSMARTPHONESESSIONID', function() {
        return client.launch.launch().then((response) => {
          assert.ok(response, 'Missing a response');
          assert.ok(client.getSessionId(), 'Missing RESTSMARTPHONESESSIONID');
        });
      });
    });

    describe('miscellaneous/siteInformation', function() {
      it('will return a bankConfiguration.bankName', function() {
        return client.miscellaneous.siteInformation().then((response) => {
          assert.ok(response, 'Missing a response');
          assert.ok(response.bankConfiguration,
                    'A bankConfiguration is returned');
          assert.ok(response.bankConfiguration.bankName,
                    'A bankConfiguration.bankName is returned');
        });
      });
    });

    describe('logon', function() {
      it('should authenticate the user', function() {
        return client.logon.logonpin({
          userId: credentials.userId,
          pin: credentials.pin
        })
        .then((response) => {
          assert.ok(response, 'Missing a response');
          assert.ok(response.length > 0, 'Missing agreements');
        });
      });

      it('should select an agreement', function() {
        return client.logon.selectagreement({
          agreementNumber: credentials.agreementNumber,
          userNumber: credentials.userNumber
        })
        .then((response) => {
          assert.ok(response, 'Missing a response');
        });
      });
    });

    describe('accounts/list', function() {
      it('should return a list of accounts', function() {
        return client.accounts.list()
        .then(accounts => {
          assert.ok(accounts, 'Missing a response');
          assert.ok(accounts.length > 0, 'Missing accounts');
          const firstAccount = accounts[0];
          // And then - we search for transactions for transactions in Jan 2017
          return client.accounts.transactions.search({
            accountId: firstAccount.id,
            agreementId: credentials.agreementNumber,
            includeReservations: true,
            transactionsFrom: '2017-01-01',
            transactionsTo: '2017-01-31'
          }).then(response => {
            assert.ok(response, 'Missing response');
            assert.ok(response.transactions, 'Missing transactions');
            assert.ok(response.transactions.length > 0, 'No transactions?');
            const firstTransaction = response.transactions[0];
            assert.ok(firstTransaction.amount, 'No amount');
            assert.ok(firstTransaction.balance, 'No balance');
            assert.ok(firstTransaction.amount, 'No amount');
          });
        });
      });
    });

    /*
    describe('accountsList', function() {
      it('should return a list of accounts', function() {
        return client.accountsList().then((response) => {
          assert(response);
        });
      });
    });
    */

  });
};
