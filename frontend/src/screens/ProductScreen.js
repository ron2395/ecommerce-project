import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../products';
import { Row, Col, Card, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
    const { id } = useParams();
    const product = products.find(p => p._id === id);
    console.log(product);
    return (
        <Fragment>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to='/' className='btn btn-light my-3'>
                    Back
                </Link>
                <Link to='/category'>
                    Category: {product.category}
                </Link>
            </div>
            <Row>
                <Col lg={5}>
                    <Image src={product.image} fluid />
                </Col>
                <Col lg={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='mb-3'>{product.name}</h2>
                            <h5>Brand: {product.brand}</h5>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col lg={3} className='text-center'>
                    <Card className='rounded'>
                        <ListGroup>
                            <ListGroup.Item>
                                Price: {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <i className='fas fa-location-dot me-2' />
                                Deliver to 121004
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {
                                product.countInStock === 0
                                ? 'Out of stock'
                                : product.countInStock <= 5
                                ? `Hurry! ${product.countInStock} items left`
                                : 'In stock'
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    ADD TO WISHLIST
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button variant='dark' className='w-100'>
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ProductScreen;