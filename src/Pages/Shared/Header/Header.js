import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import './Header.css'
const Header = () => {
    const [user] = useAuthState(auth)
    return (
        <Navbar className='sticky-top' bg="bg-body" expand="lg">
        <Container>
          <Navbar.Brand  href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/addtask">Add Task</Nav.Link>
              {
                  user ?<NavDropdown title={user.displayName} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/alltask">Show All Tasks</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{signOut(auth)}}>SignOut</NavDropdown.Item>
                </NavDropdown>
                :<Nav.Link href="/login">Login</Nav.Link> 
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;