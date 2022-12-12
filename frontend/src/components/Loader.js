import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
        animation='border'
        role='status'
        style={{
            width:'150px',
            height:'150px',
            margin:'auto',
            display:'block',
            position:'absolute',
            top:'50%',
            left:'45%'
        }}
    >
        <span className='visually-hidden'>Loading</span>
    </Spinner>
  )
}

export default Loader;