import React from 'react';
import SearchForm from './SearchForm';

class Header extends React.Component {
  render() {
    return (
      <div
        className="nav" >
        <SearchForm setInput={this.props.setInput} queryLocation={this.props.queryLocation} />
      </div>
    );
  }
}

export default Header;
