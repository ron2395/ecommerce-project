import { Navbar, Nav, Container } from 'react-bootstrap';
import{ LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>Anywhere Store</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fa-solid fa-cart-shopping' />
                                <span className='ps-2'>Cart</span>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className='fa-solid fa-user' />
                                <span className='ps-2'>Sign in</span>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Nav.Link>
                                <span className='ps-2'>Register</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    </header>
  )
}

export default Header;
