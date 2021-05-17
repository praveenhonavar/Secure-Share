import React, { Component } from "react";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";



class Register extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SecureShareContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SecureShareContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {

    var file;
    var bufferedFile;
    var fileId;
    var selectedReceiver;

    var submitButton = document.getElementById("submit");



    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    console.log('saman',contract);


    submitButton.addEventListener('click',()=>{
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        var username = document.getElementById('username').value
        var address = document.getElementById('address').value
        var phone = document.getElementById('phone').value
      
        contract.methods.registerUser(username,password,address).send({from:accounts[0]}).then(
            console.log("added user")
            );
      });
      
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (


    <div class ="register">
        <div id="form_container">
            <input placeholder="Email" type="email" id="email"/>
            <input placeholder="Password" type="password" id="password"/>
            <input placeholder="username" type="name" id="username"/>
            <input placeholder="Ethereum Address" type="text" id="address"/>
            <input placeholder="phone" type="text" id="phone"/>
        </div>

        <div id="button_container">
            <button id="submit"> SUBMIT </button>
        </div>
    </div>
      
   
    );
  }



}

export default Register;
