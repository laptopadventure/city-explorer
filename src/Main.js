import React from 'react';
import SearchForm from './SearchForm';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: "",
      locationResult: null,
    }
  }

  setInput = (str) => this.setState({searchInput: str})

  queryLocation = async event => {
    event.preventDefault()
    if(!this.state.searchInput) {
      return //no 400s!
    }
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchInput}&format=json`
    try {
      const res = await axios.get(url);
      this.setState({
        locationResult: res.data[0]
      })
      console.log(res.data[0])
    } catch (error) {
      console.warn(error)
    }
  }

  render() {
    return (
      <div className="globe">
          <SearchForm setInput={this.setInput} queryLocation={this.queryLocation} />
        {this.state.locationResult && (
          <div>
            <p>{this.state.locationResult.display_name}</p>
            <p>{this.state.locationResult.lat}, {this.state.locationResult.lon}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
