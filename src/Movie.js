import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as starReg } from '@fortawesome/free-regular-svg-icons';

class Movie extends React.Component {

  render() {
    const {
      title,
      average_votes,
    } = this.props.movie;
    let stars = [];
    for(let i = 0; i < 10; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={i < Math.floor(average_votes) ? starSolid : starReg} />);
    }

    return (
      <div onClick={() => this.props.showModal('movies', this.props.movie)} className='movie examinable'>
        <span>
          {title}
        </span>
        <span>
          {stars}
        </span>
      </div>
    );
  }
}

export default Movie;
