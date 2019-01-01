# Decentralized Star Notary Service (NJM)
The token is named Nojoom which is the arabic translation for stars. Najim or Najm is a singular form from stars and the symbole rhym with it. 

It is important to know the following points: 
### DAPP Project 5 Boilerplate Code
Boiler plate code is available at: <https://github.com/udacity/boilerPlateDAPPproject>

To get the boilerplate code, using your terminal, run:

```git clone https://github.com/udacity/boilerPlateDAPPproject.git```

Once installed, go into your cloned directory, and run:

```npm install```

For starting the development console, run:

```truffle develop```

For compiling the contract, inside the development console, run:

```compile```

For running unit tests the contract, inside the development console, run:

```test```

For migrating the contract to the locally running ethereum network, inside the development console, run:

```migrate --reset```

For running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:

```npm run dev```


To transfering stars between 2 different accounts, you need to perform some manual coding on the developer console using web3 or in the command line terminal, whatever suites you best. This is because the transfer cannot be done using Metamask since the token is ERC721 non-fongible token. Therefore, you would need to perform this taks manually. to do so use the following code with web3 on the browser developer console: 

```javascript
var Web3 = require(‘web3’);
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(“http://localhost:8545"));

var abiStarNotaryContract = web3.eth.contract(PASTE ABI HERE!);
var starNotaryContract = abiStarNotaryContract.at('PASTE CONTRACT ADDRESS HERE');

await starNotaryContract.transferStar('TO ADDRESS HERE', ‘TOKEN ID HERE’, {from: 'FROM ADDRESS HERE'}, function(error, result) {});
```