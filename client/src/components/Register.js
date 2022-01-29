import React, { Component } from "react";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Swal from "sweetalert2";

var accountType;

const refreshWindow = () => {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

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

    var submitButton = document.getElementById("submit");
    var rS = document.getElementById("role-select");

    rS.addEventListener("change", () => {
      accountType = rS.options[rS.selectedIndex].value;
      console.log("uberrr", accountType);
    });

    const { accounts, contract } = this.state;
    submitButton.addEventListener("click", () => {

      var password = document.getElementById("reg-password").value;
      var username = document.getElementById("reg-username").value;
      var address = document.getElementById("reg-address").value;

      contract.methods
        .registerUser(username, password, address,accountType)
        .send({ from: accounts[0] })
        .then((data) => {
          console.log("added user", data);

          Swal.fire({
            icon: "success",
            title: "You have been Registerd Successfully 🎉",
            showConfirmButton: false,
            timer: 2000,
          });
          window.location = "http://localhost:3000/login";
        });
    });
  };

  render() {
    if (!this.state.web3) {
      refreshWindow();
    }
    return (
      <div id="register-body">
        <h1 id="reg-head">Register YourSelf</h1>

        <div id="form-container">
          <div id="form-items">
            <h4 id="reg-item-header">Let's get you Signed Up!</h4>

            <h5 id="reg-item-subheader">Create your Account on Secure Share</h5>

            <h5 id="item-head-1">UserName</h5>
            <input
              placeholder="Enter your UserName"
              type="name"
              id="reg-username"
            />
            <br></br>

            <h5 id="item-head">Password</h5>
            <input
              placeholder="Enter your Password"
              type="password"
              id="reg-password"
            />
            <br></br>

            <h5 id="item-head">Ethereum Address</h5>
            <input
              placeholder="Enter your public Ethereum Address"
              type="text"
              id="reg-address"
            />
            <br></br>

            <h5 id="item-head-1">Select your Role</h5>

            <select id="role-select">
              <option >-- Select your Role --</option>
              <option value="Doctor">Doctor</option>
              <option value="Health Care Unit">Health Care Unit</option>
              <option value="Patient">Patients</option>
            </select>

            <div id="button_container">
              <button id="submit"> Register </button>
            </div>

            <h5 id="reg-extra">
              Already have an account?
              <Link to="login" target="_blank" id="login-xtra">
                {" "}
                SignIn here.
              </Link>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
