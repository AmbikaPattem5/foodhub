import { useState } from "react";
import { useAuth } from "../../CustomHooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
function Login(){
    const {user,login}=useAuth();
    const [error,setError]=useState('');
    const data=localStorage.getItem("users");
    const response=data?JSON.parse(data):[];
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        name:"",password:"",remember:false,
    })
    function handleSubmit(e){
        let result=false;
        e.preventDefault();
        for(let i=0;i<response.length;i++){

            if(response[i].name==formData.name && response[i].password==formData.password){
                navigate('/');
                result=true;
                login(formData.name);
            }
            
        }
        if(!result){
            setError("Invalid Credentials")
        }


    }
    function handleChange(e){
        if(e.target.name=="name"){
            setFormData({...formData,[e.target.name]:e.target.value});
        }
        if(e.target.name=="password"){
            setFormData({...formData,[e.target.name]:e.target.value});
        }
        
    }
    return(
        <div>
            <h3>Welcome Back</h3>
            <p>Login to your FoodHub account</p>
            <form onSubmit={handleSubmit}>
                <label>Email or Username</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                <label>Password</label>
                <input type="password" name="password" value={formData.password}  onChange={handleChange}/>
                <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange}/>
                <label>Remember me</label>
                <Link to='/forgotPassword'>ForgotPassword?</Link>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
export default Login;