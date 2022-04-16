import React from 'react';
import Image from 'react-bootstrap/Image';
import Movies from './Movies';
import Weather from './Weather';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      modalType: '',
      modalData: null,
    };
    this.modals = {
      weather: this.ForecastModal,
      movies: this.MovieModal,
    };
  }

  showModal = (type, data) => {
    this.setState({
      modalType: type,
      modalData: data,
      modalShown: true,
    });
  };

  hideModal = () => {
    this.setState({
      // needs to be included for modal checks
      modalShown: false,
      modalType: '',
    });
  };

  ForecastModal = () => {
    const {
      date,
      description,
    } = this.state.modalData;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forecast for {date}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            {description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </>
    );
  };

  MovieModal = () => {
    const {
      title,
      overview,
      average_votes,
      vote_count,
      release_date,
      popularity,
    } = this.state.modalData;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {overview}
          </p>
          <p>
            Released {release_date}, {vote_count} reviewers have given an averate rating
            of {average_votes} out of 10, with a popularity of {popularity}.
          </p>
          {this.state.modalData.poster && (
            <Image className='poster' src={`https://image.tmdb.org/t/p/w300${this.state.modalData.poster}`} alt={title} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </>
    );
  };

  render() {
    const {
      locationResult,
      searchInput,
      weather,
      movies,
      apiErrors,
    } = this.props;
    return (
      <div className="main">
        {apiErrors.map((errorMessage, index) => (
          <div key={index} className="spacebox loc-error">
            <p>
              {errorMessage}
            </p>
          </div>
        ))}
        <div className='horizontal-flex'>
          {locationResult && (
            <>
              <div className='spacebox'>
                <p>{locationResult.display_name}</p>
                <p>{locationResult.lat}, {locationResult.lon}</p>
                <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${searchInput}&center=${locationResult.lat},${locationResult.lon}&zoom=10`} alt="Map!" fluid />
              </div>
              <div className='spacebox px-5' >
                <h3>Some more info about {searchInput}...</h3>
                {weather && (
                  <>
                    <h4>Upcoming Weather</h4>
                    <Weather showModal={this.showModal} weather={weather} />
                  </>
                )}
                {movies && (
                  <>
                    <h4>Related Movies</h4>
                    <Movies showModal={this.showModal} movies={movies} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <Modal
          show={this.state.modalShown}
          onHide={this.hideModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
          {this.state.modalType && this.modals[this.state.modalType]()}
        </Modal>
      </div>
    );
  }
}

export default Main;
