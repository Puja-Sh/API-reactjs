import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";

import favicon from '../assets/image/favicon.png';
import classnames from '../../node_modules/classnames';
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import clickSound from "../assets/sounds/click.mp3";
import questions from "../questions.json";

class QuizClass extends Component {
  constructor(props) {
    super();
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestion: 0,
      numberOfAnswered: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
      hints: 5,
      lifeLine5050: 2,
      used5050: false,
      previousRandomNumber: [],
      nextBtnDisable: false,
      previousBtnDisable: true,
      time: {},
    };

    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.clickSound = React.createRef();
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestion(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  componentWillMount() {
    clearInterval(this.interval);
  }
  displayQuestion = (
    questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;

    if (questions.length != undefined) {
      // questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];

      const answer = currentQuestion.answer;

      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuestion: questions.length,
        answer,
        previousRandomNumber: []
      }, () => {
        this.showOptions();
        this.disableButtonHandler();
      });
    }
  };

  optionClickHandler = (e) => {
    const optionClicked = e.target.innerText;
    const correct = this.correctSound.current;
    const wrong = this.wrongSound.current;
    if (optionClicked == this.state.answer) {
      setTimeout(() => {
        correct.play();
      }, 100);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        wrong.play();
      }, 100);
      this.wrongAnswer();
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswer: prevState.correctAnswer + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnswered: prevState.numberOfAnswered + 1,
      }),
      () => {
       if(this.state.nextQuestion === undefined) {
         this.endGame();
       } else {
        this.displayQuestion(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
       }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer :(",
      classes: "toast-invalid",
      displayLength: 1500,
    });

    this.setState(
      (prevState) => ({
        wrongAnswer: prevState.wrongAnswer,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnswered: prevState.numberOfAnswered + 1,
      }),
      () => {
        if(this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
         this.displayQuestion(
           this.state.questions,
           this.state.currentQuestion,
           this.state.nextQuestion,
           this.state.previousQuestion
         );
        }
      }
    );
  };

  //----------Button Handler-----------
  buttonClickHandler = (e) => {
    this.playBtnSound();
    switch (e.target.id) {
      case "next-btn":
        this.nextBtnHandler();
        break;
      case "previous-btn":
        this.prevBtnHandler();
        break;
      case "quit-btn":
        this.quitBtnHandler();
        break;
      default:
        break;
    }
  };

  // Next Button Handler
  nextBtnHandler = () => {
    // this.playBtnSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestion(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  // Previous Button Handler
  prevBtnHandler = () => {
    this.playBtnSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestion(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  // Quit Button Handler
  quitBtnHandler = () => {
    // this.playBtnSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  //Button click Sound
  playBtnSound = () => {
    this.clickSound.current.play();
  };

  //----------End Button Handler-----------

//----------LifeLine Handler-----------
  //show options when question changed
  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
      option.style.visibility = 'visible';
    });

    this.setState({
      used5050: false
    })
  }

  //hint handler
  hintHandler = () => {
    if(this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let answerIndex;
  
      options.forEach((option, index) => {
        if(option.innerText.toLowerCase() === this.state.answer.toLowerCase()) {
          answerIndex = index;
        }
      });
  
      while(true) {
        const randomNumber = Math.round(Math.random() * 3);
        if(randomNumber !== answerIndex && !this.state.previousRandomNumber.includes(randomNumber)){
          options.forEach((option, index) => {
            if(index === randomNumber) {
              option.style.visibility = 'hidden';
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumber: prevState.previousRandomNumber.concat(randomNumber)
              }));
            }         
          });
          break;
        }
        if(this.state.previousRandomNumber.length >=3 ) break;
      }
    }
   
  };

  lifeLine5050Handler = () => {
    if(this.state.lifeLine5050 > 0 && this.state.used5050 === false) {
      const options = Array.from(document.querySelectorAll(".option"));
      const randomNumbers = [];
      let answerIndex;

      options.forEach((option, index) => {
        if(option.innerText.toLowerCase() === this.state.answer.toLowerCase()) {
          answerIndex = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if(randomNumber !== answerIndex) {
          if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(answerIndex)){
            randomNumbers.push(randomNumber);
            count++;

          } else {
            while(true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(answerIndex)) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while(count < 2)

      options.forEach((option, index) => {
        if(randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState(prevState => ({
        lifeLine5050: prevState.lifeLine5050 - 1,
        used5050: true
      }))
    }
  };
//----------End LifeLine Handler-----------

//----------Disable Handler-----------
  disableButtonHandler = () => {
    if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
      this.setState({
        previousBtnDisable: true
      })
    } else {
      this.setState({
        previousBtnDisable: false
      })
    }

    if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestion) {
      this.setState({
        nextBtnDisable: true
      })
    } else {
      this.setState({
        nextBtnDisable: false
      })
    }
  }
//----------End Disable Handler-----------

startTimer = () => {
  const countDown = Date.now() + 181000;

  this.interval = setInterval(() => {
    const now = new Date();
    const distance = countDown - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(distance < 0) {
      clearInterval(this.interval);
      this.setState({
        time: {
          minutes: 0,
          seconds: 0
        }
      }, () => {
        this.endGame();
      });
    } else {
      this.setState({
        time: {
          minutes,
          seconds
        }
      })
    }
  }, 1000 );
}

endGame = () => {
  const { state } = this;
  const playerStats = {
    score: state.score,
    numberOfQuestion: state.numberOfQuestion,
    numberOfAnswered: state.numberOfAnswered,
    correctAnswer: state.correctAnswer,
    // wrongAnswer: state.wrongAnswer,
    wrongAnswer: (state.numberOfAnswered - state.correctAnswer) , 
    used5050: 2 - state.lifeLine5050,
    hintsUsed: 5 - state.hints
  };
  setTimeout(() => {
    this.props.history.push('/quiz/result', playerStats);
  }, 1000);
}


  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestion,
      hints,
      lifeLine5050,
      time
    } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title> Quiz | Quiz App</title>
          <link rel="icon" type="image/png" href={favicon} sizes="128x128" />
        </Helmet>
        <Fragment>
          <audio ref={this.correctSound} src={correctSound}></audio>
          <audio ref={this.wrongSound} src={wrongSound}></audio>
          <audio ref={this.clickSound} src={clickSound}></audio>
        </Fragment>
        <div className="questions">
          <section>
            <div className="timer-container">
              <p>{time.minutes} : {time.seconds}</p>
            </div>

            <div className="quiz-top-container">
              <div className="score-container">
                <p>
                  <span>
                    {currentQuestionIndex + 1} / {numberOfQuestion}
                  </span>
                </p>
              </div>
              <div className="lifeline-container">
                <p onClick={this.lifeLine5050Handler}>
                  <i className="fas fa-adjust"></i>
                  {lifeLine5050}
                </p>
                <p onClick={this.hintHandler}>
                  <i className="far fa-smile-wink"></i>
                  {hints}
                </p>
              </div>
            </div>

            <h5 id="question"> {currentQuestion.question} </h5>

            <div className="quiz-options-container">
              <p onClick={this.optionClickHandler} className="option">
                {currentQuestion.optionA}
              </p>
              <p onClick={this.optionClickHandler} className="option">
                {currentQuestion.optionB}
              </p>
              <p onClick={this.optionClickHandler} className="option">
                {currentQuestion.optionC}
              </p>
              <p onClick={this.optionClickHandler} className="option">
                {currentQuestion.optionD}
              </p>
            </div>

            <div className="btn-container">
              <div>
                <button onClick={this.buttonClickHandler} id="quit-btn">
                  Quit
                </button>
              </div>
              <div>
                <button onClick={this.buttonClickHandler} id="previous-btn" className={classnames('', {'disable' : this.state.previousBtnDisable})}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <button onClick={this.buttonClickHandler} id="next-btn" className={classnames('', {'disable' : this.state.nextBtnDisable})}>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default QuizClass;
