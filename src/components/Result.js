import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import favicon from '../assets/image/favicon.png';

class Result extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnswered: 0,
            correctAnswered: 0,
            wrongAnswered: 0,
            usedHints: 0,
            used5050: 0
        }
    }

    componentDidMount() {
        const { state } = this.props.location;
        if(state) {
            this.setState(
                {
                    score: (state.score / state.numberOfQuestion) * 100 ,
                    numberOfQuestions: state.numberOfQuestion,
                    numberOfAnswered: state.numberOfAnswered,
                    correctAnswered: state.correctAnswer,
                    wrongAnswered: state.wrongAnswer,
                    usedHints: state.hintsUsed,
                    used5050: state.used5050
                }
            );
        }
       
    }
  render(){
    const { state } = this.props.location;
    const { score } = this.props.location.state;
    let stats, remark;
    const marks = (score / state.numberOfQuestion) * 100;
    console.log(marks);
    if(marks <= 30 ) {
        remark = "Padhai karey ap thoda!"
    } else if( marks>30 &&marks<= 50) {
        remark = "Better luck next time"
    } else if (marks>50 && marks<=70) {
        remark = "You can do better!"
    } else if( marks>71 && marks<=90) {
        remark = "You did great!"
    } else {
        remark = " Bohot Khoob :D"
        // console.log(score);
    }


    if(state !== undefined ) {
        stats = (
            <Fragment>
                <section className="result-container">
                    <div>
                        <span><i class="far fa-check-circle"></i></span>  
                    </div> 
                    <h6>Quiz has ended</h6>
                    <div className="container">
                        <h4>{remark}</h4>
                        <h2>Your Score : {this.state.score.toFixed(0)}%</h2>
                        <div className="result-data">
                            <div>
                                <p>Total number of questions</p>
                                <p>{this.state.numberOfQuestions}</p>
                            </div>
                            <div>
                                <p>Question answered</p>
                                <p>{this.state.numberOfAnswered}</p>
                            </div>
                            <div>
                                <p>Correct answered</p>
                                <p>{this.state.correctAnswered}</p>
                            </div>
                            <div>
                                <p>Wrong answered</p>
                                <p>{this.state.wrongAnswered}</p>
                            </div>
                            <div>
                                <p>Hints used</p>
                                <p>{this.state.usedHints}</p>
                            </div>
                            <div>
                                <p>50-50 used</p>
                                <p>{this.state.used5050}</p>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li><Link to="/quiz">Play Again</Link></li>
                                <li><Link to="/">Back to Home</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
              
            </Fragment>
          
        )
    } else {
        stats = (
            <Fragment>
                <h2 className="no-stats"> No result available </h2>
                <section>
                            <ul>
                                <li><Link to="/">Back to Home</Link></li>
                                <li><Link to="/quiz">Start Quiz</Link></li>
                            </ul>
                </section>
            </Fragment>
        )
    }

    return(
        <Fragment>
            <Helmet>
                <title> Result | Quiz App</title>  
                <link rel="icon" type="image/png" href={favicon} sizes="128x128" />            
            </Helmet>  
            <section className="stats">
                {stats}
            </section>
        </Fragment>
    );
  }
}

export default Result;