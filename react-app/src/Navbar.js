import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-dark bg-dark px-5" expand="md">
        <NavbarBrand tag={Link} to="/">
          Home
        </NavbarBrand>
      </Navbar>
    );
  }
}
