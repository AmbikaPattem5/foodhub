import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../CustomHooks/useAuth';
function Header(){
            const navigate=useNavigate();
            const {user,login,logout}=useAuth();
    function handleLogin(){
        navigate('/login')
    }    
    function handleRegister(){
        navigate('/register')
    }

console.log(user);

return(
    <div className="container">
        <div className='img'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvALr_p3z5_yT7TzdJa38utVnwssmTjWdeGi8kFDfEQ&s=10' alt='FoodHub' height={50} width={70}/>
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
            <Link to='/cart'>Cart</Link>
        </div>
        <div className='buttons'>
          {!user? <button onClick={handleLogin}>Login</button>:<p>{user}<button onClick={logout}>Logout</button></p>}
          { user?"":<button onClick={handleRegister}>Register</button>}
        </div>

    </div>
)
}
export default Header;