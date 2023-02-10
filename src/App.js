import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import config from "./config.json";
function App() {
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
  const handleClick = async () => {
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
              value: web3.utils.toWei("0.1"),
            },
            (error, transactionHash) => {
              console.log(transactionHash, error);
            }
          );
        return true;
      } else {
        console.log("meta mask not connected");
        // utils.showErrorAlert('Whoops...', 'Metamask is not installed')
        return false;
      }
    } catch (error) {
      console.log("error while connecting metamask", error);
      // setConnected(true)
      alert("something wrong");
      return false;
    }
    
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={handleClick}>CLick</button>
      </header>
    </div>
  );
}

export default App;
