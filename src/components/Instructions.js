import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import lifelineImage from '../assets/image/lifeline.png'
import favicon from '../assets/image/favicon.png';

const Instruction = () => {
  return (
    <Fragment>
      <Helmet>
        <title> Quiz Instructions | Quiz App</title>
        <link rel="icon" type="image/png" href={favicon} sizes="128x128" />
      </Helmet>

      <div className="instructions-container">
        <h2>How to Play the Game</h2>
        <p>Ensure you read this guide from start to finish!</p>
        <ul className="main-ul">
          <li>The game has a duration of 3 minutes. </li>
          <li>Each game consists of 15 questions.</li>
          <li>Every question contains 4 options.</li>
          <li>
            Choose the correct answer from the given options.
          </li>
          <li>
            Each game has 2 lifelines
            <ul className="sub-li">
              <li>two 50-50 chances</li>
              <li>five Hints</li>
            </ul>
            <div className="image">
              <img src={lifelineImage}/>
            </div>
            
          </li>
          <li>
            Selecting a 50-50 lifeline by clicking the icon <i class="fas fa-adjust"></i> will remove 2 wrong
            answers, leaving one correct answer and one wrong answer.
          </li>
          <li>
            Using a hint <i class="far fa-smile-wink"></i> will remove one or more wrong answer from the options.
          </li>
          <li>
            You can quit the quiz anytime. 
          </li>
          <li>The timer starts as soon as the game loads.</li>
        </ul>

        <div className="bottom-btn">
            <span className="left"><Link to="/">Back</Link> </span>
            <span className="right"><Link to="/quiz"> Let's Do this! </Link> </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Instruction;
