// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import FullScreenLoader from './components/MasterLayout/FullScreenLoader'
import ProductList from './Pages/Product-List'

const App = () => {


  return (
    <>
      <Router>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<ProductList />} />
        </Routes>
      </Router>
      <FullScreenLoader />
    </>
  )
}

export default App
