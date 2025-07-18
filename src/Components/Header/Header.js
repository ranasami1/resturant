import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import logo from '../assets/logo.jpg';
import "./Header.css"
import '../Header/Header.css';
import i18next from 'i18next';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { Button } from 'react-bootstrap';

function Header() {
  const { t, lng } = useContext(AppContext);
  
  return (
    <Navbar bg="black" className='Navbar' data-bs-theme="warning" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} style={{height:"100px"}} alt="Koshary El Tahrir Logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="custom-link">
              {t("Home")}
            </Nav.Link>
            <Nav.Link href="/menu" className="custom-link">
              {t("Menu")}
            </Nav.Link>
            <Nav.Link href="/about" className="custom-link">
              {t("About Us")}
            </Nav.Link>
            <Nav.Link href="/contact" className="custom-link">
              {t("Contact Us")}
            </Nav.Link>
          </Nav>
          
          <Nav>
            {lng === "en" ? (
              <Button 
                variant="warning" 
                onClick={() => { i18next.changeLanguage("ar") }}
                className="language-btn"
              >
                العربية
              </Button>
            ) : (
              <Button 
                variant="warning" 
                onClick={() => { i18next.changeLanguage("en") }}
                className="language-btn"
              >
                English
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;