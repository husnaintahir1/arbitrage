const Web3 = require('web3');
const config = require('./abi.json');
const web3 = new Web3();













// const contractABI = [{...}]; // ABI of the smart contract
// const contractAddress = '0x...'; // Address of the smart contract

const contract = new web3.eth.Contract(config.abi, "0xf3eB7F54a6AF838B9F72802d7b6Acf184f1b9Cd0");
web3.eth.net.getId((err, networkId) => {
    if (err) {
      console.error('Error connecting to Ethereum network:', err);
      return;
    }
  
    console.log(`Connected to Ethereum network:`, networkId);
  
    // Get the current account from MetaMask
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error('Error getting accounts:', err);
        return;
      }
  
      console.log(`Current account:`, accounts[0]);
    });
  });
// Call a method of the contract
// contract.methods.trading(
//     2,
//     ["0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C","0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C","0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C"],
//     ["1000000000000000000","2000000000000000000","2000000000000000000"],
//     ["2000000000000000000","1000000000000000000","1000000000000000000"]
// ).call((error, result) => {
//   console.log(result);
// });

// Send a transaction to the contract
// contract.methods.trading(
//     ["0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C","0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C","0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C"],
//     ["1000000000000000000","2000000000000000000","2000000000000000000"],
//     ["2000000000000000000","1000000000000000000","1000000000000000000"]
// ).send({ from: '0xBE4a2BcCDFfc2ffbB4fbe5648b2bD4e1D49f93B2',value:web3.utils.toWei("0.1") }, (error, transactionHash) => {
//   console.log(transactionHash,error);
// });

// // Listen for events emitted by the contract
// contract.events.someEvent({}, (error, event) => {
//   console.log(event);
// });

// const updateLPAddress = async () => {
//     try {
//       const web3 = window.web3;
//       let contractAdd = integrateContract();
//       const data = await contractAdd.methods
//         .UpdateLpReceiver(updateLP)
//         .send({
//           from: account,
//           value:2
//         });
//       toast.success("Transaction Successful");
//     } catch (e) {
//       console.log("e", e);
//       toast.error("Transaction Failed");
//     }
//   };