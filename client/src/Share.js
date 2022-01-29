import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "./contracts/SecureShare.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import Swal from "sweetalert2";
import "./styles/Share.css";

const refreshWindow = () => {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class Share extends Component {
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
    var file;
    var bufferedFile;
    var fileId;
    var selectedReceiver;

    var chooseButton = document.getElementById("choose");
    var uploadButton = document.getElementById("upload");

    var fileAddedIcon = document.getElementById("file-added");
    var uploadIcon = document.getElementById("upload-icon");

    var loader = document.getElementById("loader");
    var pw = document.getElementById("pw");
    var beforeAdd = document.getElementById("before-add");
    var afterAdd = document.getElementById("after-add");
    var fileName = document.getElementById("file-name");

    var selectReceiver = document.getElementById("select-receiver");
    var chooseButton = document.getElementById("choose");
    var uploadButton = document.getElementById("upload");

    var cusUploadBtn = document.getElementById("share-btn");

    var account = document.getElementById("account");

    const { accounts, contract } = this.state;

    fileAddedIcon.style.display = "none";
    loader.style.display = "none";
    pw.style.display = "none";

    cusUploadBtn.style.display = "none";

    Swal.fire({
      title: "Make sure you have Logged In using the same Account in MetaMask",
      showConfirmButton: false,
      timer: 2500,
    });

    contract
      .getPastEvents("AddedUser", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((val) => {
        var size = val.length;

        for (var index = 0; index < size; index++) {
          var name = val[index].returnValues.name;
          var address = val[index].returnValues.accountAddress;

          var accountType = val[index].returnValues.accountType;

          if (accounts[0] == address) {
            account.innerHTML = ` ${name} -  &nbsp&nbsp${accountType} Account`;
          }
          selectReceiver.innerHTML += `<option value=${address}>${name}</option>`;
        }
      });

    selectReceiver.addEventListener("change", () => {
      selectedReceiver =
        selectReceiver.options[selectReceiver.selectedIndex].value;
    });

    chooseButton.addEventListener("change", (event) => {
      event.preventDefault();

      file = event.target.files[0];

      fileAddedIcon.style.display = "block";
      cusUploadBtn.style.display = "block";
      uploadIcon.style.display = "none";
      beforeAdd.style.display = "none";

      afterAdd.innerText = `Your have selected the file ${file.name}\n
      Click on Share to Proceed`;

      const reader = new window.FileReader();

      reader.readAsArrayBuffer(file);

      reader.onloadend = () => {
        bufferedFile = Buffer.from(reader.result);
      };
    });

    uploadButton.addEventListener("click", (event) => {
      event.preventDefault();

      var d = new Date().toLocaleString();

      fileAddedIcon.style.display = "none";
      afterAdd.innerText = "";
      loader.style.display = "block";
      pw.style.display = "block";
      cusUploadBtn.style.display = "none";

      var fileName = file.name;
      var receiver = selectedReceiver;

      ipfs.files.add(bufferedFile, (err, res) => {
        if (err) {
          return console.log("Error", err);
        }

        contract.methods
          .uploadHash(res[0].hash, fileName, accounts[0], receiver, d)
          .send({ from: accounts[0] })
          .then((data) => {
            loader.style.display = "none";
            pw.style.display = "none";

            uploadIcon.style.display = "block";
            beforeAdd.style.display = "block";
            cusUploadBtn.style.display = "none";

            if (localStorage.getItem(accounts[0]) == null) {
              localStorage.setItem(accounts[0], "[]");
            }

            var oldData = JSON.parse(localStorage.getItem(accounts[0]));
            oldData.push(fileName);

            if (res.value != null) {
              localStorage.setItem(accounts[0], JSON.stringify(oldData));
            }

            Swal.fire({
              title: "File Shared Successfully !",
              icon: "success",
              button: "Done!",
            });

            contract.methods
              .getFileId(receiver)
              .call()
              .then((val) => {
                fileId = val;
                console.log("board dash hctib", fileId);
                contract.methods
                  .getFile(fileId - 1, receiver)
                  .call()
                  .then((res) => {
                    console.log(res);
                  });
              });
          });
      });
    });
  };

  render() {
    if (!this.state.web3) {
      refreshWindow();
    }
    return (
      <div className="Share">
        <nav id="nav-bar-ss">
          <ul id="nav-items-ss">
            <Link to="/">
              <li id="home">Home</li>
            </Link>

            <Link to="/dashboard">
              <li id="dashboard-ss">Dashboard</li>
            </Link>

            <li id="share-ss">Start Sharing</li>

            <li id="account">Your Account</li>
          </ul>
        </nav>

        <div id="share-desc">
          <div id="share-intro">Share your Electronic Health Records using</div>
          <div id="share-sub-intro">Secure Share</div>
        </div>

        <div id="share-box">
          <select id="select-receiver">
            <option value="address">Select the Receiver</option>
          </select>

          <div id="select-file">
            <input id="choose" type="file" name="fileUpload" />

            <label for="choose" id="file-select">
              <i
                class="fa fa-download fa-5x"
                aria-hidden="true"
                id="upload-icon"
              ></i>

              <h3 id="before-add">Select the File which you want to Share</h3>

              <i class="fas fa-file-medical fa-5x" id="file-added"></i>
            </label>

            <h3 id="after-add"></h3>

            <img src="assets/loader-1.gif" alt="" id="loader" />

            <h3 id="pw">Please Wait, Your Transaction is being Processed</h3>
          </div>

          <div id="upload-file">
            <input
              type="button"
              value="Upload to IPFS"
              id="upload"
              name="upload-btn"
            />
            <label for="upload">
              <span id="file-upload-btn" id="share-btn">
                Share your File
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Share;
