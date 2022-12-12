import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if(successUpdate){
        dispatch({
            type: PRODUCT_UPDATE_RESET
        })
        navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    }
}
  }, [dispatch, navigate, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
        _id: product._id,
        name,
        price,
        description,
        brand,
        countInStock,
        image,
        category
    }))
  };

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try{
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/upload', formData, config);

        setImage(data)
        setUploading(false)
    } catch(error){
        console.log(error.response.data)
        setUploading(false)
    }
  }

  return (
    <Fragment>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <Col lg={4} md={6}>
          <Row>
            <h1 className='mb-3'>Edit Product details</h1>
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
                <Form.Group controlId='price' className='mb-2'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='image' className='mb-3 mt-3'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Form.Control type='file' label='Choose file' onChange={uploadFileHandler} />
                  {uploading ? <Loader /> : null}
                </Form.Group>
                <Form.Group controlId='description' className='mb-3 mt-3'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='brand' className='mb-3 mt-3'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='category' className='mb-3 mt-3'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='countinstock' className='mb-3 mt-3'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Count in stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='text-center'>
                  <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-primary w-100 mb-3'
                  >
                    {loading ? <Spinner animation='border' /> : 'Update'}
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

export default ProductEditScreen;
