import React from "react";
import { Navbar } from "react-bootstrap";

import "./header.styles.css";

const Header = () => (
  <React.Fragment>
    <Navbar className="Header">
      <Navbar.Brand href="#home">
        <span className="HeaderTitle">Sapient Games Arena</span>
      </Navbar.Brand>
    </Navbar>
    <hr style={{ marginTop: 0 }} />
  </React.Fragment>
);

export default Header;
