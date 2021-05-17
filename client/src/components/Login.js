import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";



class Login extends Component {
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

    
      
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (

        <div>
            <img src="../public/assets/logo-homepage.png" alt="" id="logo" />
                
                <div id="container-box">
                    <div id="login-container">

                        <div id="content">
    
                            <h3 id="item-header">Welcome to Secure Share</h3>
    
                            <h4 id="item-subheader">Sign in to your account to continue</h4>
    
                            <label id="email-label">Email Address</label><br/>
    
                            <input type="email" name="" id="email-ip" placeholder="hello@gmail.com"/><br/>
            
                            <label id="pwd-label">Password</label><br/>
    
                            <input type="password" name="" id="password-ip" placeholder="Password"/><br/>
            
                            <label id='fpwd'>Forgot your password?</label><br/>
    
                            <Link to='dashboard' target="_blank">
                            <input type="button" value="Sign In" id ="login-button"/>
                            </Link>
                            
            
                            <p>Need an account? <a href="./Register.html" id="reg-here" >Register here.</a></p>
    
    
                </div>

            </div>
            </div>
        </div>
   
    );
  }



}

export default Login;
