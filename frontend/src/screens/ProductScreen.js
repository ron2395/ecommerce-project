import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const ProductScreen = () => {
    const [ qty, setQty ] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { error: errorProductReview, success: successProductReview } = productReviewCreate;

    useEffect(() => {
        if(successProductReview){
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(id))
    },[dispatch, id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating, comment
        }))
    }

    return (
      <Fragment>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to='/' className='btn btn-light my-3'>
            Back
          </Link>
          <span>Category: {product.category}</span>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Fragment>
            <Meta title={product.name} />
            <Row>
              <Col lg={6}>
                <Image src={product.image} fluid />
              </Col>
              <Col lg={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2 className='mb-3'>{product.name}</h2>
                    <h5>Brand: {product.brand}</h5>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col lg={3} className='text-center'>
                <Card className='rounded'>
                  <ListGroup>
                    <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      <i className='fas fa-location-dot me-2' />
                      Delivery in 5-7 days
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.countInStock === 0 ? (
                        <span>
                          <i className='fas fa-circle-xmark me-2' />
                          Out of stock
                        </span>
                      ) : product.countInStock <= 5 ? (
                        <span>
                          <i className='fas fa-circle-exclamation me-2' />
                          Hurry! Only {product.countInStock} items left
                        </span>
                      ) : (
                        <span>
                          <i className='fas fa-circle-check me-2' />
                          In stock
                        </span>
                      )}
                    </ListGroup.Item>
                    {product.countInStock > 0 ? (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <Form.Select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ) : (
                      ""
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        variant='primary'
                        className='w-100'
                        disabled={product.countInStock === 0}
                      >
                        <i className='fas fa-cart-shopping me-2' />
                        ADD TO CART
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <h2 className='mt-4'>Reviews</h2>
                {product.reviews.length === 0 ? (
                  <Message>No reviews yet</Message>
                ) : null}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <span className='fw-bold user-name'>{review.name}</span>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a review</h2>
                    {errorProductReview ? <Message variant='danger'>{errorProductReview}</Message>
                    : null}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group className='mt-3 mb-3'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>login</Link> to post a review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Fragment>
        )}
      </Fragment>
    );
}

export default ProductScreen;