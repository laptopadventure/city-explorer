import React from 'react';
import DayForecast from './DayForecast';

class Weather extends React.Component {
  render() {
    return (
      <div>
        {this.props.weather.map((day, index) => (
          <DayForecast showModal={this.props.showModal} key={index} forecast={day} />
        ))}
      </div>
    );
  }
}

export default Weather;
