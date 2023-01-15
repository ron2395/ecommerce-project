import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-secondary'>
      <Container>
        <Row>
          <Col className='text-center py-3 text-white'>Copyright &copy; 2022</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
