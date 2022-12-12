import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}));
        navigate('/payment')
    }

  return (
    <FormContainer>
        <Col lg={6} md={8}>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='mb-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter street address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId='city' className='mb-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId='postalCode' className='mb-2'>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Area code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId='country' className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-primary'
                >Continue</Button>
                </Form.Group>
            </Form>
      </Col>
    </FormContainer>
  );
}

export default ShippingScreen
