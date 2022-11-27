import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import styles from './Product.module.css'

const Product = ( {product} ) => {
    const outOfStock = product.countInStock === 0;

  return (
    <Card className={`my-3 p-3 rounded ${styles['index-card']}`}>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image} variant='top' className={outOfStock && 'opacity-25'} />
        </Link>
        <Card.Body>
            <Link to={`/products/${product._id}`}>
                <Card.Title>{product.name}</Card.Title>
            </Link>
            <Card.Text className='my-3'>
                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
            </Card.Text>
            <Card.Text className='h5'>starting ₹{product.price}</Card.Text>
            <Card.Text>
                {outOfStock && 'Out of stock'}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
