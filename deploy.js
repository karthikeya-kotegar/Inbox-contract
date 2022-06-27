// deploy code will go here
// truffle-hdWallet-provider will connect to wallet(external account) to network.
const HDWalletProvider = require('@truffle/hdwallet-provider');
// 'Web3' constructor from web3.
const Web3 = require('web3');
// interface, bytecode from compiled code.
const { interface, bytecode } = require('./compile');
// provider is used to connect web3 and ethereum network.
// provider instance.
// takes user account mnenomic phrase and infura api endpoint as arguments which creates a node in ethereum network.
const provider = new HDWalletProvider(
    'since guitar toast grief drop risk teach pole snake hope female scene',
    'https://rinkeby.infura.io/v3/fe1c24d8eaba43c3835a7f2a1c8aec39'
)
// providers are communication layer between web3(frontend) and ethereum network.
// web3 instance
const web3 = new Web3(provider);

//deployment
const deploy = async () => {
    //get all accounts linked from mnemonic phrase i.e each user can have multiple accounts.
    const accounts = await web3.eth.getAccounts();
    console.log("attempting to deploy from account: ", accounts[0]);

    //contract instance
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: 1000000 });
    console.log("contract deployed to: ", result.options.address);

    // to prevent hanging deployment
    provider.engine.stop(); // add at the end of deployment code
}

// call deployment
deploy();
