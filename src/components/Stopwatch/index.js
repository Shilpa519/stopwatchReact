import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isRunning: false, timerInSeconds: 0}

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timerInSeconds: prevState.timerInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  onStopTimer = () => {
    const {isRunning} = this.state
    if (isRunning) {
      this.clearTimerInterval()
      this.setState(prevState => ({isRunning: !prevState.isRunning}))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({isRunning: false, timerInSeconds: 0})
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerInSeconds} = this.state

    const minutes = Math.floor(timerInSeconds / 60)
    const seconds = Math.floor(timerInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    console.log(timerInSeconds)

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning} = this.setState
    return (
      <div className="app-container">
        <h1 className="main-heading">Stopwatch</h1>
        <div className="timer-container">
          <p className="timer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="timer-icon"
            />
            Timer
          </p>
          <h1 className="timer-display">
            {this.getElapsedSecondsInTimeFormat()}
          </h1>
          <div className="start-stop-reset-container">
            <button
              className="start-btn"
              type="button"
              onClick={this.onStartTimer}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className="stop-btn"
              type="button"
              onClick={this.onStopTimer}
              disabled={isRunning}
            >
              Stop
            </button>
            <button
              className="reset-btn"
              type="button"
              onClick={this.onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
