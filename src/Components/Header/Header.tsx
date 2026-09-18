import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../CustomHooks/useAuth';
import useCart from '../../CustomHooks/useCart';
import logo from '../../assets/FoodHub_logo.png'
function Header(){
            const navigate=useNavigate();
            const {user,logout}=useAuth();
            const {totalCartItems} = useCart();
    function handleLogin(){
        navigate('/login')
    }    
    function handleRegister(){
        navigate('/register')
    }


return(
    <div className="container">
        <div className='img'>
            <img src={logo} alt='FoodHub' height={50} width={70}/>
        </div>
        <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/restaurants'>Restaurants</Link>
            <Link to='/offers'>Offers</Link>
            <Link to='/about'>About</Link>
        </div>
        <div>
            <div>🔍</div>
        </div>
        <div>
            <Link to='/cart'>Cart({totalCartItems()})</Link>
            <Link to="/orders">My Orders</Link>
        </div>
        <div>
            <Link to='/favorites'>Favorites</Link>
        </div>
        <div className='buttons'>
          {!user? <button onClick={handleLogin}>Login</button>:<p>{user}<button onClick={logout}>Logout</button></p>}
          { user?"":<button onClick={handleRegister}>Register</button>}
        </div>

    </div>
)
}
export default Header;