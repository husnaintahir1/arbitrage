import "./App.css";
import Web3 from "web3";
import config from "./config.json";
import { useState } from "react";
import { openCustomNotificationWithIcon } from "./utils/Notification";
function App() {
  const [form, setForm] = useState({
    tradeAmount: 0,
    error: null,
  });

  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, error: null, [e.target.name]: e.target.value }));
  }

  const getAccount = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      return account;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(form.tradeAmount <= 0){
      setForm(prev => ({ ...prev, error: "Please Enter amount greater than zero" }));
      return;
    }
    await window.ethereum.enable();
    const account = await getAccount();

    try {
      let isConnected = false;
      if (window.ethereum) {
        console.log("Metamask connected");
        isConnected = true;
      } else {
        console.log("Metamask not installed");
        isConnected = false;
      }
      if (isConnected) {
        console.log("IDDDDDD");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          config.abi,
          "0xf3eB7F54a6AF838B9F72802d7b6Acf184f1b9Cd0"
        );

        console.log(contract, "contract");
        //  Send a transaction to the contract
        contract.methods
          .trading(
            [
              "0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C",
              "0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C",
              "0x8586EEDCF9F9f595B0f5Fa415aCef77A6458464C",
            ],
            [
              "1000000000000000000",
              "2000000000000000000",
              "2000000000000000000",
            ],
            [
              "2000000000000000000",
              "1000000000000000000",
              "1000000000000000000",
            ]
          )
          .send(
            {
              from: account,
              value: web3.utils.toWei(form.tradeAmount),
            },
            (error, transactionHash) => {
              if(error) {
                console.log(error, "transactionHashError");
                openCustomNotificationWithIcon("error", "Error in Transaction, Please Try Later");
              }
              else {
                console.log(transactionHash, "transactionHash");
                setTransactionHash(transactionHash);
              }
            }
          );
        return true;
      } else {
        openCustomNotificationWithIcon("error", "Meta Mask not Connected");
        console.log("meta mask not connected");
        // utils.showErrorAlert('Whoops...', 'Metamask is not installed')
        return false;
      }
    } catch (error) {
      openCustomNotificationWithIcon(error, "");
      console.log("error while connecting metamask", error);
      // setConnected(true)
      alert("something wrong");
      return false;
    }
    
  };
  return (
    <div className="App">
      <div className="tradeForm">
        <form onSubmit={handleClick}>
          <input className="tradeInput" step="any" onChange={(e) => handleChange(e)} name="tradeAmount" type="number" placeholder="Enter BNB Amount" required />
          <br />
          {form.error && <div className="error">{form.error}</div>}
          <button className="tradeBtn" type="submit">Trade</button>
        </form>
      </div>
      {transactionHash && <a className="transactionLink" href={`https://testnet.bscscan.com/tx/${transactionHash}`} rel="noreferrer" target="_blank" >
          Your Transaction Details
      </a>}
    </div>
  );
}

export default App;
