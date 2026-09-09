import { NavLink } from "react-router-dom";

function Register(){
    function handleSubmit(){

    }
    function handleChange(){

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" name="name" value={}onChange={handleChange} required/>
            <label>Email</label>
            <input type="email" name="email" value={} onChange={handleChange} required/>
            <label>Phone Number</label>
            <input type="number" name="phone" value={} onChange={handleChange} required/>
            <label>Password</label>
            <input type="text" name="password" value={} onChange={handleChange}/>
            <label>Confirm Password</label>
            <input type="text" name="confirmPassword" value={} onChange={handleChange}/>
            <input type="checkbox" name="terms" checked={} onChange={handleChange}/>
            <button type="submit">Register</button>
            </form>
            <p>Already have an account</p><NavLink to='/login'>Login</NavLink>
        </div>
    )
}
export default Register;