import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {temp: 0, desc: '', icon: '', location: 'London', loading: true, showError: false}
  }

  changeLocation = (l) => {
    this.setState({location: l.target.value});
  }

  // REST API call
  getWeather = () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=Metric&APIkey=8efe2c6a78b4b0f4e1d7324c86ea347f`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        temp: responseData.main.temp,
        desc: responseData.weather[0].description,
        icon: responseData.weather[0].icon,
        loading: false
      })
    })
    .catch(err => document.getElementById("error-message").style.display = "block");
  }

  componentDidMount() {
 //   document.getElementById("error-message").style.display = "none";
    this.getWeather();
    this.setState({loading: false});
  }
  
  // Show
  render() {
    const imgSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;
    const error = <p>Cannot find that location</p>;
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Weather</h1>
          </header>
          <Grid container direction="column" justify="center" alignItems="center">
            <h3>{this.state.temp} °C</h3>
            <h3>{this.state.desc}</h3>
            <img src={imgSrc} alt="Weather Icon" />     
            <TextField id="location-input" label="Location" onChange={this.changeLocation} margin="normal" variant="outlined" />
            <Button variant="contained" onClick={this.getWeather} value={this.state.location}>Change Location</Button>
            <p id="error-message">Cannot find that location</p>
          </Grid>
        </div>
      );
    }
  }
}

export default App;
