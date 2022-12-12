import { useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const qty = searchParams.get('qty');

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const checkoutHandler = () => {
        if (!userInfo){
            navigate('/login?redirect=/shipping')
        } else {
            navigate("/shipping")
        }
    }

  return (
    <Row className='mt-5'>
        <Col md={8}>
            <h1 className='mb-4'>Shopping Cart</h1>
            {cartItems.length === 0
            ? (<Message>
                <h2>Hey User</h2>
                <br />
                <h3>Your cart is empty <i className='fa-regular fa-face-frown' /></h3>
                Check out the <Link to='/'>latest products</Link> here
                </Message>)
                : (<ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={5}>
                                    <Row>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        {item.price}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <i className='fas fa-truck me-2' />
                                    <small>5-7 business days | Free</small>
                                </Col>
                                <Col md={2}>
                                    <Form.Select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            className='cart-select'
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option
                                                    key={x + 1}
                                                    value={x+1}
                                                    >
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                    </Form.Select>
                                </Col>
                                <Col md={1}>
                                    <Button variant='light'
                                    onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash-can' />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>)
                }
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>PRICE DETAILS</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row className='mb-2'>
                            <Col md={8}>
                                Price ({cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)} items)
                            </Col>
                            <Col md={4}>
                                ₹{cartItems.reduce((acc, item) =>
                                    acc + parseInt(item.qty) * item.price, 0)}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                Delivery charges
                            </Col>
                            <Col md={4}>
                                FREE
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row className='fw-bold'>
                            <Col md={8}>
                                Total amount:
                            </Col>
                            <Col md={4}>
                                ₹{cartItems
                                .reduce((acc, item) => 
                                acc + parseInt(item.qty) * item.price, 0)
                                .toFixed(2)}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='w-100'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                        >PROCEED TO CHECKOUT</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen;
