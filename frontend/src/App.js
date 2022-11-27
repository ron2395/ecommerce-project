import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
        <Header />
        <main>
          <Container className='my-4'>
            <Routes>
              <Route path='/' element={ <HomeScreen /> } />
              <Route path='/products/:id' element={ <ProductScreen /> } />
            </Routes>
          </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
