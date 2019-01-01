// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
       	provider: function() {
 			return new HDWalletProvider("chalk any fine raccoon adjust join doll insect whip gospel photo wish", "https://rinkeby.infura.io/v3/9686c812fd2b427090fe8a215dc688a4")
     	},
       	network_id: 4, // network id for test networks
       	gas: 4700000 // gas limit
     }
   }
}
