import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    return (
      <div>
        {this.props.movies.map((movie, index) => (
          <Movie showModal={this.props.showModal} key={index} movie={movie} />
        ))}
      </div>
    );
  }
}

export default Movies;
