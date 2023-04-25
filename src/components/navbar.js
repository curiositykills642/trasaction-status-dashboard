import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';

export function navbar1(){
    return (
        <div>
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
              <Navbar.Brand>Aws Transaction Analysis Dashboard</Navbar.Brand>
              <button className="btn btn-light btn-sm">
                  Help!
              </button>
          </Container>
        </Navbar>
      </div>
    )
}