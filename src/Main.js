import React from 'react';
import SearchForm from './SearchForm';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      locationResult: null,
      apiErrors: [],
      weather: null,
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
      const infoRes = await axios.get(infoUrl);
      const target = infoRes.data[0];
      const weather = await this.getWeather(target.display_name);
      this.setState({
        locationResult: target,
        apiErrors: [],
        weather: weather,
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

  getWeather = async cityName => {
    let res;
    try {
      res = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city=${cityName}`);
    } catch (error) {
      this.addAPIError('Failed to fetch weather data. ' + error.message);
      return [];
    }
    return res.data;
  };

  render() {
    return (
      <div className="main">
        <SearchForm setInput={this.setInput} queryLocation={this.queryLocation} />
        {this.state.locationResult && (
          <>
            <div>
              <p>{this.state.locationResult.display_name}</p>
              <p>{this.state.locationResult.lat}, {this.state.locationResult.lon}</p>
              <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchInput}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="Map!" fluid />
            </div>
            {/* this has a sanity check because the weather could fail to get but the location could be successful */}
            {this.state.weather && this.state.weather.map(day => (
              <div>
                On {day.date}, there will be {day.description}.
              </div>
            ))}
          </>
        )}
        {this.state.apiErrors.map((errorMessage, index) => (
          <div key={index} className="loc-error">
            <p>
              {errorMessage}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
