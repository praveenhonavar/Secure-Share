import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";

import Swal from "sweetalert2";

import "../styles/Login.css";

const pd = () => {
  console.log("oooooooooooooooooooooooo");
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

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
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Make sure that you are using your MetaMask Account",
      showConfirmButton: false,
      timer: 2500,
    });

    var loginUserName = document.getElementById("login-username");
    var loginPassword = document.getElementById("login-password");
    var loginBtn = document.getElementById("login-button");

    loginBtn.addEventListener("click", () => {
      var userName = loginUserName.value;
      var password = loginPassword.value;

      console.log(userName);
      console.log(password);

      contract.methods
        .authenticateUser(userName, password)
        .send({ from: accounts[0] })
        .then((data) => {
          console.log(data.events);

          
          contract.getPastEvents("Success").then((val) => {
            if (val[0].returnValues.value == true) {
              console.log("inn");
              Swal.fire({
                icon: "success",
                title: "Logged-In Successfully 🎉",
                showConfirmButton: false,
                timer: 2000,
              });

              window.location = "http://localhost:3000/dashboard";
            } else {
              console.log("foff");
              Swal.fire({
                icon: "fail",
                title:
                  "Please Make sure that you are using same MetaMask Account 😕",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        });
    });
  };

  render() {
    if (!this.state.web3) {
      pd();

      console.log("pkfpefpef");

      // return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <img src="../public/assets/logo-homepage.png" alt="" id="logo" />

        <div id="login-container-box">
          <h1 id="login-head">Login Here</h1>

          <div id="login-container">
            <div id="login-content">
              <h4 id="login-item-header">Welcome to Secure Share</h4>

              <h5 id="login-item-subheader">
                Sign in to your account to continue
              </h5>

              <h5 id="item-head-1">UserName</h5>

              <input
                type="text"
                name=""
                id="login-username"
                placeholder="Enter your UserName"
              />
              <br />

              <h5 id="item-head">Password</h5>

              <input
                type="password"
                name=""
                id="login-password"
                placeholder="Enter your Password"
              />
              <br />

              <h5 id="fpwd">Forgot your password?</h5>

              <input type="button" value="Sign In" id="login-button" />

              <h5 id="reg-here">
                Need an account?{" "}
                <Link to="register" target="_blank" id="reg-xtra-sht">
                  Register here.
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
