import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button, Spinner, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listUserOrders } from '../actions/orderActions';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  const orderUserList = useSelector((state) => state.orderUserList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderUserList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
        if(!user || !user.name || success){
          dispatch({ type: USER_PROFILE_UPDATE_RESET });
            dispatch(getUserDetails('profile'))
            dispatch(listUserOrders())
            setPassword('')
            setConfirmPassword('')
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [navigate, dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h1 className='mb-3'>USER PROFILE</h1>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {success ? alert('Profile details updated') : null}
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter new email'
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
              {loading ? <Spinner animation='border' /> : "UPDATE"}
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={8}>
        <h1>ORDERS</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        {order.delivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
