import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SearchForm extends React.Component {
  render() {
    return (
      <Form className="spessform" onSubmit={event => this.props.queryLocation(event)}>
        <Form.Group className="mb-3" controlId="locationSearch">
          <Form.Label>Search for a place you'd like to visit!</Form.Label>
          <Form.Control onChange={event => this.props.setInput(event.target.value)} type="text" placeholder="Seattle" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
      </Form>
    );
  }
}

export default SearchForm;
