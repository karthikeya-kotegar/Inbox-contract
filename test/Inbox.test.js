// contract test code will go here
const assert = require('assert'); // to check and verify values.
const ganache = require('ganache-cli'); // test environment and test accounts
// note: capital 'W' for varaiable because pkg will return web3 constructor.
const Web3 = require('web3'); //  interact with a local or remote ethereum node
//  get the interface(ABI) and byteCode from compile.js by destructuring.
const { interface, bytecode } = require('../compile');

// create instance of web3
// providers are communication layer between web3(frontend) and ganache(ethereum network)
const web3 = new Web3(ganache.provider());
// variables for testing
let accounts;
let inbox;

// mocha is used for testing
// it has 3 functions- beforeEach(), describe() and it().
// beforeEach() is used for general setup before testing.
//  is called before each it() func execution.
beforeEach(async () => {
    //get list of all pre-generated unlocked 10 test accounts.
    // web3 has eth method which contains many functions.
    // eth returns a promise

    // using .then()
    // web3.eth.getAccounts()
    //     .then((fetchedAccount) => {
    //         console.log("fetchedAccount", fetchedAccount);
    //     });

    // OR

    // using async-await
    accounts = await web3.eth.getAccounts();

    //deploy the contract using one of the test accounts.
    // convert interface json string to object.
    // instance of contract.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] }) // deploy the bytecode and pass arguments to constructor.
        .send({ from: accounts[0], gas: 1000000 }) //send transaction fee. use first test account and gas for deployment.

});

// describe() will have all the it() func.
describe('Inbox', () => {
    // it() will have testing logic, called after beforeEach().

    // test the contract deployment
    it('deploys a contract', () => {
        // console.log("accounts", inbox);
        assert.ok(inbox.options.address); // check if value exists.
    });

    // test the default message from constructor
    it('has a default message', async () => {
        // contract instance will have all the methods in contract.
        // it don't make any change in blochchain -has no transaction just view (call type).
        const message = await inbox.methods.message().call();
        // verify if actual value is same as expected value.
        assert.equal(message, 'Hi there!');
    })

    // test to change the message.
    it('can change the message', async () => {
        // it changes the data in blockchain - send transaction need gas (transaction type).
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        // view the message
        const message = await inbox.methods.message().call();
        // verify if viewd message is same as changed message.
        assert.equal(message, 'bye');
    })
});