import { Fragment, useState, useEffect } from "react";
import API from '../api';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if(!loading) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  }

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await API.get("/api/config/paypal");
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch({
        type: ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, order, successPay, successDeliver, navigate, userInfo]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Fragment>
      <h1>Order {order._id} summary</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger' className='text-start'>
                  Not yet delivered
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger' className='text-start'>
                  Not Paid
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {order.orderItems.length === 0 ? (
                <Message>Hey {}, This order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col lg={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col lg={4}>
                          {item.qty} x ₹{item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>Shipping</Col>
                  <Col>
                    {order.shippingPrice === 0
                      ? "FREE"
                      : `₹${order.shippingPrice}`}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>Discount</Col>
                  <Col>₹{order.discount}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order.isPaid ? null : (
                <ListGroup.Item>
                  {loadingPay ? <Loader /> : null}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={paymentSuccessHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn w-100'
                    onClick={deliverHandler}
                  >
                    {loadingDeliver ? <Loader /> : "Mark as paid"}
                  </Button>
                </ListGroup.Item>
              ) : null}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderScreen;