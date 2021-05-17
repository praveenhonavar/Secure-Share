import React, { Component } from "react";
import { Link } from "react-router-dom";
import SecureShareContract from "../contracts/SecureShare.json";
import getWeb3 from "../getWeb3";

// import '../styles/Dashboard.css';

class Dashboard extends Component {
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

    var fileId;
  

    var sharedFiles = document.getElementById("shared-files");



    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    console.log('saman',contract);


    contract.methods.getFileId(accounts[0]).call().then(
        (val)=>{
          var ipfsSite = 'http://ipfs.io/ipfs/';
          fileId=val;
          console.log('board dash hctib',fileId);
  
          for (let index = 0; index < fileId; index++) {
            // const element = array[index];
            contract.methods.getFile(index,accounts[0]).call().then((res)=>{
              console.log("hctib",res);
  
              // sharedFiles.innerHTML+= `<h4>${res[1]} &nbsp&nbsp ${res[2]}</h4> 
              // <a href=${ipfsSite+res[0]}><button>Download</button></a>`;
  
  
            // sharedFiles.innerHTML+=
            // `<div style=width:20em;height:5em;margin:20px;background-color:#0d1320>
  
            // <h6 style=color:#d9d9d9>${res[1]} &nbsp&nbsp ${res[2]}</h6>
              
            // <a href=${ipfsSite+res[0]}><button style=background-color:#00ffa4>Download</button></a>
            
            // </div>`
  
            sharedFiles.innerHTML+=
           `<div class="courses-container">
            <div class="course">
                <div class="course-preview">
                    <h6>Time Stamp</h6>
                    <br>
                    <h4>${res[4]}</h4>
  
                </div>
                <div class="course-info">
                    
                    <h6>File Name</h6>
                    
                    <h2>${res[1]}</h2>
  
                    <h6 id="sender">Sender</h6>
                    
                    <h4>${res[2]}</h4>
  
  
                    <a href=${ipfsSite+res[0]}>
                    <button class="btn">Download</button>
                    </a>
                </div>
            </div>
        </div>`
  
  
            })
  
            
          }
         
        }
      )


  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (


    <div className="db">
    <nav id="nav-bar">
        <ul id="nav-items">

            <a href="../public/homePage.html" target="_blank">
                <li id="home">Home</li>
            </a>
            

            <li id="dashboard">Dashboard</li>

            <Link to='share' target='_blank'>
                <li id="share">Start Sharing</li>

            </Link>
            

            <li id="account">Your Account</li>
           
        </ul>

    </nav>

    <div id="wrap">

        <section id="dashboard-container">
                <div id="Introduction">Welcome to Secure Share, Luna</div>
                <div id="sub-intro">Explore a Secure way of sharing Health Records</div>
        </section>

<h3 id='dash-head'>Files Shared with You</h3> 

         <div id="shared-files">
            
        </div>         
    </div>

    </div>
      
   
    );
  }



}

export default Dashboard;
