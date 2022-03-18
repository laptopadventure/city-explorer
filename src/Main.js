import React from 'react';
import SearchForm from './SearchForm';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: "",
      locationResult: null,
      locError: '',
    }
  }

  setInput = (str) => this.setState({searchInput: str})

  queryLocation = async event => {
    event.preventDefault()
    // if(!this.state.searchInput) {
    //   return //no 400s!
    // }
    const infoUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchInput}&format=json`
    try {
      const infoRes = await axios.get(infoUrl);
      const target = infoRes.data[0]
      this.setState({
        locationResult: target,
        locError: '',
      })
    } catch (error) {
      let reason = ''
      let readableError = error.toJSON()
      switch(readableError.status) {
        case 400: {
          reason = 'Status 400. Please, enter a location!'
          break
        }
        case 404: {
          reason = 'Status 404. Your location couldn\'t be found, wow!'
          break
        }
        case 500: {
          reason = 'Status 500. The location grabber server is dead!'
          break
        }
        default:
          reason = 'Something on our end went wrong!'
      }
      this.setState({
        locationResult: null,
        locError: reason,
      })
    }
  }

  render() {
    return (
      <div className="main">
          <SearchForm setInput={this.setInput} queryLocation={this.queryLocation} />
        {this.state.locationResult && (
          <div>
            <p>{this.state.locationResult.display_name}</p>
            <p>{this.state.locationResult.lat}, {this.state.locationResult.lon}</p>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchInput}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="Map!" fluid />
          </div>
        )}
        {this.state.locError && (
          <div className="loc-error">
            <p>
              {this.state.locError}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
