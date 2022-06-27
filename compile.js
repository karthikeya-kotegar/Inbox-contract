// compile code will go here
const path = require('path'); // creates the path.
const fs = require('fs'); // filesystem operations-read, write etc.
const solc = require('solc');  //Compile the contract using Solc package

// get path for Inbox.sol file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// read the contract source code
const source = fs.readFileSync(inboxPath, 'utf-8');

// compile the source code and number of contracts.
// will get ByteCode, ABI and other contract info.
module.exports = solc.compile(source, 1).contracts[':Inbox']; //can be imported in other files.
