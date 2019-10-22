import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {temp: 0, desc: '', icon: '', loading: true}
  }
  // REST API call
  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&APIkey=8efe2c6a78b4b0f4e1d7324c86ea347f')
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        temp: responseData.main.temp,
        desc: responseData.weather[0].description,
        icon: responseData.weather[0].icon,
        loading: false
      })
    })
    .catch(err => console.error(err));
  }
  // Show
  render() {
    const imgSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    }
    else {
      return (
        <div className="App">
          <p>Temperature: {this.state.temp} C</p>
          <p>Description: {this.state.desc}</p>
          <img src={imgSrc} alt="Weather Icon" />     
        </div>
      );
    }
  }
}

export default App;
