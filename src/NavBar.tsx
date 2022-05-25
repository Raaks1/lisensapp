import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  NavItem
} from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './NavBar.css';
import { AppUser, useAppContext } from './AppContext';

interface UserAvatarProps {
  user: AppUser
};

function UserAvatar(props: UserAvatarProps) {
  // If a user avatar is available, return an img tag with the pic
  return <img
      src={props.user.avatar || "no-profile-photo.jpg"} alt="user"
      className="rounded-circle align-self-center mr-2"
      style={{ width: '32px' }}></img>;
}

export default function NavBar() {
  const app = useAppContext();
  const user = app.user || { displayName: '', email: '' };

  return (
      <Navbar bg="success" variant="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand href="/">All Users</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto" navbar>
            <AuthenticatedTemplate>
              <NavItem>
               <RouterNavLink to="/Search" className="nav-link">Search</RouterNavLink>
              </NavItem>
              </AuthenticatedTemplate>
              <AuthenticatedTemplate>
              <NavItem>
               <RouterNavLink to="/Assignedplans" className="nav-link">My info</RouterNavLink>
              </NavItem>
              </AuthenticatedTemplate>
              <AuthenticatedTemplate>
              <NavItem>
               <RouterNavLink to="/Organization" className="nav-link">Organization</RouterNavLink>
               
              </NavItem>
              </AuthenticatedTemplate>
        
            </Nav>

            <Nav className="ms-auto align-items-center " navbar>
            <AuthenticatedTemplate>
             <NavItem className="logo">
      <img src="https://placeholder.pics/svg/150x50/888888/EEE/Logo" alt="..." height="36"></img></NavItem>
      </AuthenticatedTemplate>
            
            </Nav>
            <Nav className="ms-auto align-items-center" navbar>
       
              <AuthenticatedTemplate>
                <NavDropdown title={<UserAvatar user={user} />} id="user-dropdown" align="end">
                  <h5 className="dropdown-item-text mb-0">{user.displayName}</h5>
               
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={app.signOut!}>Sign Out</Dropdown.Item>
                </NavDropdown>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <NavItem>
                  <Nav.Link
                    onClick={app.signIn!}>Sign In</Nav.Link>
                </NavItem>
              </UnauthenticatedTemplate>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}