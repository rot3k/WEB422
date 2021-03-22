import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import About from './component/About';
import NotFound from './component/NotFound';
import Restaurant from './component/Restaurant';
import Restaurants from './component/Restaurants';  


function App() {
 const [searchString, setSearchString] = useState("");
 
 let history = useHistory();

 const handleSubmit = (e) => {
  e.preventDefault();
  history.push(`/restaurants?borough=${searchString}`);
  setSearchString("");
};
return (
<>
  <Navbar bg="light" expand="lg">
    <LinkContainer to="/">
      <Navbar.Brand>New York Restaurants</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/restaurants">
          <Nav.Link>Full List</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about">
          <Nav.Link>About</Nav.Link>
        </LinkContainer>
      </Nav>
      <Form onSubmit={handleSubmit} inline>
        <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
        <Button type="submit" variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>

  <Container>
        <Row>
          <Col>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/Restaurants" />}
              />
              <Route exact path="/about" render={() => <About />} />
              <Route
                exact
                path="/Restaurants"
                render={(props) => (
                  <Restaurants query={props.location.search} />
                )}
              />
              <Route
                exact
                path="/Restaurant/:id"
                render={(props) => <Restaurant id={props.match.params.id} />}
              />
              <Route render={() => <NotFound />} />
            </Switch>
          </Col>
        </Row>
      </Container>

  <br />
</>
);
}

export default App;
