import React from 'react';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {
  render() {
    return (
      <Nav
        className="Nav"
        activeKey="link-0"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)} >
        <Nav.Item>
          <Nav.Link eventKey="link-0">Coming soon!</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Coming soon!</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Coming soon!</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Header;
