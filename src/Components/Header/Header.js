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
  const { t,lng } = useContext(AppContext);
  return (
      <Navbar bg="black" className='Navbar' data-bs-theme="warning" >
        <Container >
        <Navbar.Brand href="/"><img src={logo} style={{height:"100px"}}></img></Navbar.Brand>
        <Nav className="my-auto mb-0">
        <Nav.Link href="/" className="custom-link">{t("Categories")}</Nav.Link>
        {lng === "en"?
        <Button variant="warning" onClick={()=>{i18next.changeLanguage("ar")
        }}>العربية</Button>:<Button variant="warning" onClick={()=>{i18next.changeLanguage("en")
        }}>English</Button>}
        </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;