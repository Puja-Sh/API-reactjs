import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import QuizClass from "./quiz";

const Home = () => (
  <Fragment>
    <Helmet>
      <title> Quiz App - Home</title>
    </Helmet>
    <div id="home">
      <section>
        <div>
          <i className="fab fa-studiovinari"></i>
        </div>
        <h1>Quiz App</h1>
        {/* <QuizClass/> */}
        
        <div className="play-btn-container">
        <Link to="/play/instructions">
            <ul>
                <li> Start</li>
            </ul> 
        </Link>
        </div>
        <div className="social-container">
            <a href="https://www.instagram.com/aalsi_pupu/?igshid=mrmhi32hodvf" className="instagram-btn"><i class="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/pujash/" className="linkedin-btn"><i class="fab fa-linkedin-in"></i></a>
        </div>
      <div className="footer">
        <p>Created by Puja Sharma</p>
      </div>   
      </section>  
     
    </div> 
   
  </Fragment>
);

export default Home;
