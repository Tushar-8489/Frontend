import { Link } from 'react-router-dom';
import { useAuth } from './context/auth.jsx';

const Dashbord = () => {
  const [auth, setAuth] = useAuth();
    
  return (
    <div>
    <h1>{auth.user.name}</h1>
    <h3>{auth.user.email}</h3>
    <h3>{auth.user.phone}</h3>
    <Link to='/profile'>Profile</Link>
    {auth.user.role ? <><Link to="/category">Category</Link>
      <Link to="/products">Product</Link>
      <Link to="/photos">Photo</Link>
      </> : <h3>History</h3>}
    
    </div>
  )
}

export default Dashbord;