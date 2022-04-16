import React from 'react';

class DayForecast extends React.Component {
  render() {
    const {
      date,
      description,
    } = this.props.forecast;
    return (
      <div onClick={() => this.props.showModal('weather', this.props.forecast)} className='day-forecast examinable'>
        On {date}, there will be {description}.
      </div>
    );
  }
}

export default DayForecast;
