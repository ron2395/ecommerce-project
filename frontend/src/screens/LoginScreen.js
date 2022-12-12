import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row, Form, Button, Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from '../components/FormContainer';
import { login } from "../actions/userActions";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const [searchParams] = useSearchParams();

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';
    
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch login
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
      <Col lg={3} md={4}>
        <Image src='/images/form.jpg' className='h-100' fluid />
      </Col>
      <Col lg={4} md={6}>
        <Row>
          <h1 className='mb-3'>SIGN IN</h1>
          {error ? <Message variant='danger'>{error}</Message> : null}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='mb-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='text-center'>
              <Button
                type='submit'
                variant='primary'
                className='btn btn-primary w-100 mb-3'
              >
                {loading ? <Spinner animation='border' /> : "Log in"}
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
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className='btn btn-primary w-100'
            >
              Register
            </Link>
          </Col>
        </Row>
      </Col>
    </FormContainer>
  );
}

export default LoginScreen
;