import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Col, Row, Form, Button, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, userInfo } = userRegistration;

  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch register
    if(password === confirmPassword){
    dispatch(register(name, email, password));
    } else {
        setMessage('Passwords do not match');
    }
  };

  return (
    <FormContainer>
      <Col lg={3} md={4}>
        <Image src='/images/form.jpg' className='h-100' fluid />
      </Col>
      <Col lg={4} md={6}>
        <Row>
          <h1 className='mb-3'>SIGN UP</h1>
          {error ? <Message variant='danger'>{error}</Message> : null}
          {message ? <Message variant='danger'>{message}</Message> : null}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-2'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a user name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email' className='mb-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password again'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='text-center'>
              <Button
                type='submit'
                variant='primary'
                className='btn btn-primary w-100 mb-3'
              >
                {loading ? <Spinner animation='border' /> : "REGISTER"}
              </Button>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <Col className='text-center mb-3'>OR</Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className='btn btn-primary w-100'
            >
              LOG IN
            </Link>
          </Col>
        </Row>
      </Col>
    </FormContainer>
  );
};

export default RegisterScreen;
