import Web3 from "web3"
import config form "./abi.json"
const connect = async () => {
    try {
      let isConnected = false
      if (window.ethereum) {
        console.log('Metamask connected')
        window.web3 = new Web3(window.ethereum)
        isConnected = true
        
      } else if (window.web3) {
        console.log('Metamask connected')
        window.web3 = new Web3(window.web3.currentProvider)
        isConnected = true
        
      } else {
        console.log('Metamask not installed')
        isConnected = false
        
      }
      if (isConnected) {
        let isChainCorrect = true
       
        const web3 = window.web3
        tokenContract = new web3.eth.Contract(
          config.tokenAbi,
          config.tokenContractAddr
        )
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const tokens = isChainCorrect
          ? await get_tokens_in_wallet(accounts[0])
          : 0.0
        let resp
        if (email) {
          resp = utils.connectByEmail({
            email: email,
            walletAddress: accounts[0],
            zerohexToken: tokens,
            type: 'metamask',
          })
        } else {
          resp = await httpUser.connectMetamask({
            metamaskAddress: accounts[0],
            zerohexToken: tokens,
            type: 'metamask',
          })
        }
        if (!resp.success) {
          utils.showErrorAlert(
            'Registered already',
            'This wallet is associated with some other account. Please connect with other wallet address'
          )
          return false
        }
        if (!profile) {
          dispatch(updateProfileType('client'))
        }
        console.log(resp.token)
        dispatch(updateWalletAdd(accounts[0]))
        dispatch(updateZhxTokens(tokens))
        dispatch(updateAuthToken(resp.token))
        setConnected(true)
        return true
      } else {
        utils.showErrorAlert('Whoops...', 'Metamask is not installed')
        return false
      }
    } catch (error) {
      console.log('error while connecting metamask', error)
      setConnected(true)
      utils.showErrorAlert('Whoops...', 'Something went wrong.')
      return false
    }
  }