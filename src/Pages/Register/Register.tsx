import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { User,FormErrors } from "../../types/Types";
function Register(){
    const [formData,setFormData]=useState<User>({
      name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        terms:false,

    })
    const [formErrors,setFormErrors]=useState<FormErrors>({name:"",email:"",password:"",confirmPassword:""})
    function handleSubmit(e){
        e.preventDefault();
        let updatedUsers;
        if(formData.name===""){
            setFormErrors({...formErrors,name:"Name is required"})
        }
        if(formData.email===""){
            setFormErrors({...formErrors,email:"Email is required"})

        }
        if(formData.password!=formData.confirmPassword){
            setFormErrors({...formErrors,confirmPassword:"password do not match"})
        }
                console.log(formData);
        const response=localStorage.getItem("users")
        const responsData=JSON.parse(response);
        console.log("this is"+response);
        if(responsData===null){
             updatedUsers=[formData]
        }
        else{
         updatedUsers=[...responsData,formData]
        }
        localStorage.setItem("users",JSON.stringify(updatedUsers));
        setFormData({name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        terms:false,})
    }
    function handleChange(e){
        if(e.target.type=="email"){
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        else if(e.target.type=="checkbox")
            setFormData({...formData,[e.target.name]:e.target.checked})
        else{
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {formErrors.name&&<p>{formErrors.name}</p>}
            <label>Email</label>
            <input type="email" name="email" value={formData.email}onChange={handleChange} required/>
            {formErrors.email&&<p>{formErrors.email}</p>}
            <label>Phone Number</label>
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} required/>
            <label>Password</label>
            <input type="text" name="password" value={formData.password} onChange={handleChange}/>
            {formErrors.password&&<p>{formErrors.password}</p>}
            <label>Confirm Password</label>
            <input type="text" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            <input type="checkbox" name="terms" checked={formData.terms}  onChange={handleChange}/>
            
            <button type="submit">Register</button>
            </form>
            <p>Already have an account</p><NavLink to='/login'>Login</NavLink>
        </div>
    )
}
export default Register;