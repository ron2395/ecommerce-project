import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
    const { id: userId } = useParams()

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate){
        dispatch({
            type: USER_UPDATE_RESET
        })
        navigate('/admin/userlist')
    } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
    }
  }, [dispatch, user, navigate, successUpdate, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch register
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  };

  return (
    <Fragment>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <Col lg={4} md={6}>
          <Row>
            <h1 className='mb-3'>Edit user details</h1>
            {loadingUpdate ? <Loader /> : null}
            {errorUpdate ? <Message variant='danger'>{errorUpdate}</Message> : null}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
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
                <Form.Group controlId='isadmin' className='mb-3 mt-3'>
                  <Form.Check
                    type='checkbox'
                    label='Admin Privilege'
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group className='text-center'>
                  <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-primary w-100 mb-3'
                  >
                    {loading ? <Spinner animation='border' /> : "Update"}
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Row>
        </Col>
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;