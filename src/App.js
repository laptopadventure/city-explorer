import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      locationResult: null,
      apiErrors: [],
      weather: null,
      movies: null
    };
  }

  addAPIError = (message, clearLocation) => {
    const newErrors = [...this.state.apiErrors];
    newErrors.push(message);
    if(clearLocation) {
      this.setState({
        locationResult: null,
        apiErrors: newErrors,
      });
    } else {
      this.setState({
        apiErrors: newErrors
      });
    }
  };

  setInput = (str) => this.setState({searchInput: str});

  queryLocation = async event => {
    event.preventDefault();
    const infoUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchInput}&format=json`;
    try {
      this.setState({
        apiErrors: [],
      });
      const infoRes = await axios.get(infoUrl);
      const target = infoRes.data[0];
      const weather = await this.getWeather(target);
      const movies = await this.getMovies(target);
      this.setState({
        locationResult: target,
        weather: weather,
        movies: movies,
      });
    } catch (error) {
      let reason = '';
      let readableError = error.toJSON();
      switch(readableError.status) {
      case 400:
        reason = 'Status 400. Please, enter a location!';
        break;
      case 404:
        reason = 'Status 404. Your location couldn\'t be found, wow!';
        break;
      case 500:
        reason = 'Status 500. The location grabber server is dead!';
        break;
      default:
        reason = 'Something on our end went wrong!';
      }
      this.addAPIError(reason, true);
    }
  };

  getWeather = async target => {
    let res;
    try {
      res = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city=${target.display_name}&lat=${target.lat}&lon=${target.lon}`);
    } catch (error) {
      this.addAPIError('Failed to fetch weather data. ' + error.message);
      return [];
    }
    return res.data;
  };

  getMovies = async target => {
    let res;
    try {
      res = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${target.display_name}`);
    } catch (error) {
      this.addAPIError('Failed to fetch movie data. ' + error.message);
      return [];
    }
    return res.data;
  };

  render() {
    return (
      <div className="App">
        <Header setInput={this.setInput} queryLocation={this.queryLocation} />
        <Main
          locationResult={this.state.locationResult}
          searchInput={this.state.searchInput}
          weather={this.state.weather}
          movies={this.state.movies}
          apiErrors={this.state.apiErrors} />
        <Footer />
      </div>
    );
  }
}

export default App;
