import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';

import "../styles/HomePage.css";

function HomePage(){
   
  return(

    <div className="HomePage">
      <div id="nav-bar">
        <img src="assets/logo-hp.png" alt="" id="logo"/>

        <ul id="nav-items">

          <a href="#tech-stack">
            <li id="about-us">About Us</li>
          </a>

          <li id="features">
            <a href="#features-container">
              Features
            </a>
          </li>

          <li>
            <a href="./Login.html"  target="_blank">
              <button id="login"></button>
              <label for="login" id="login">
                <p>Sign In</p>
              </label>
            </a>
          </li>

          <a href="./Register.html" target="_blank">
            <li>
              <button id="register">Register</button>

              <label for="register" id="register">
                <p>Register</p>
              </label>

            </li>
          </a>

        </ul>
      </div>

    <div id="content">
      <div id="description">
        <h1>
          Share your Electronic Health Records<br/><span>Securely</span> using IPFS & Blockchain
        </h1>

        <br/>
        <br/>

        <p>
          Electronic Health Records are encrypted and uploaded to IPFS,<br/> 
          which is a decentralized file storage system. This files can later<br/>
          be retrived by the person to whom it was intended to share with.
        </p>
      </div>

      <img src="assets/bc-hp.png" alt="yoooo" id="bc-img"/>

      <div id="buttons">
        <input type="button" value="Learn More" id="learn-more"/>
        <Link to="login" target="_blank">
          <input type="button" value="Get Started" id="get-started"/>
        </Link>
      </div>
    </div>

    <div id="features-container">
      <ul id="features-items">
        <li>
          <img src="assets/feat/1.png" alt=""/>
          <h3>Secure</h3>
        </li>

        <li>
          <img src="assets/feat/2.png" alt=""/>
          <h3>Efficient</h3>
        </li>

        <li>
          <img src="assets/feat/3.png" alt=""/>
          <h3>Decentralized</h3>
        </li>
      </ul>

      <ul id="features-items-2">
        <li>
          <img src="assets/feat/4.png" alt=""/>
          <h3>Available 24x7</h3>
        </li>

        <li>
          <img src="assets/feat/5.png" alt=""/>
          <h3>Free File Storage</h3>
        </li>
      </ul>
    </div>



<div id="showcase">



</div>

<div id="tech-stack">


</div>

<div id="footer">

<p> Made with &#10084;&#65039;</p>

</div>

</div>

  
 
     
    

       
    );
}

export default HomePage;