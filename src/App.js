import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Signup from './Page/Auth/Signup';
import PrivateComponent from './components/PrivateComponent'
import Login from './Page/Auth/Login'
import AddProduct from './Page/Product/AddProduct';
import ProductList from './Page/Product/ProductList';
import UpdateComponent from './Page/Product/UpdateComponent'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Navbar />
     <Routes>
       <Route element={<PrivateComponent />}>
       <Route path="/" element={<ProductList />} />
       <Route path="/add" element={<AddProduct />} />
       <Route path="/update/:id" element={<UpdateComponent />} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       {/* <Route path="/profile" element={<h1>Profile Component</h1>} /> */}
       </Route>

       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />

     </Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;