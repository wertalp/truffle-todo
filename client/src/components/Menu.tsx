import React, { Component, useEffect } from "react";
import {Navbar, Container ,Nav, NavDropdown } from 'react-bootstrap'
import { IMenu } from "../data-models/interfaces";


export const Menu = (props : IMenu) => {

useEffect( () => {
    console.log("here we test component ")
} )

return (
    <Navbar  expand="lg" className="color-nav" >
  <Container>
    <Navbar.Brand href="#home">Blocky TODO Manager</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">CONNECT</Nav.Link>
        <Nav.Link href="#link">Link BC</Nav.Link>
        <NavDropdown title="Contracts" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Connect Ganache</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">{props.account}</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">NetID : {props.networkId} </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">PW SS</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
)
}
