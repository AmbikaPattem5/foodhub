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
    const [formErrors,setFormErrors]=useState<FormErrors>({name:"",email:"",password:"",phone:"",confirmPassword:"",terms:false})
    function validateForm():FormErrors{
        const errors:FormErrors={name:"",email:"",password:"",confirmPassword:"",phone:"",terms:false};
        if(formData.name===""){
        errors.name="Name is required";
        }
        if(formData.email===""){
            errors.email="Email is required";
        
        }
        if(formData.phone===""){
            errors.phone="Phone number is required"
        }
        else if(formData.phone.length<=10){
            errors.phone="Phone number must be 10 digits"
        }
        if(formData.password===""){
            errors.password="Password is required"
        }
        else if(formData.confirmPassword===""){
            errors.password="Confirm Password is required"
        }
        else if(formData.password!==formData.confirmPassword){
            errors.password="Confirm Password is mismatched";
        }
        if(formData.terms===false){
            errors.terms="Accept terms and conditions"
        }
        
        return errors;
    }
    function handleSubmit(e){
        e.preventDefault();
       const errors=validateForm()
        let updatedUsers:User[];
        // if(formData.name===""){
        //     setFormErrors({...formErrors,name:"Name is required"})
        // }
        // if(formData.email===""){
        //     setFormErrors({...formErrors,email:"Email is required"})

        // }
        // if(formData.password!=formData.confirmPassword){
        //     setFormErrors({...formErrors,confirmPassword:"password do not match"})
        // }
        setFormErrors(errors);
        const errorResult=Object.values(errors).some(errMessage=>errMessage!="")
        if(errorResult){
            return;
        }
        
                console.log(formData);

        const response:string|null=localStorage.getItem("users")
        

        const responsData:User[]=response==null?[]:JSON.parse(response);
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
            <input type="text" name="name" value={formData.name} onChange={handleChange}  />
            {formErrors.name&&<p>{formErrors.name}</p>}
            <label>Email</label>
            <input type="email" name="email" value={formData.email}onChange={handleChange} />
            {formErrors.email&&<p>{formErrors.email}</p>}
            <label>Phone Number</label>
            <input type="string" name="phone" value={formData.phone} onChange={handleChange} />
            {formErrors.phone&&<p>{formErrors.phone}</p>}
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            {formErrors.password&&<p>{formErrors.password}</p>}
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            <input type="checkbox" name="terms" checked={formData.terms}  onChange={handleChange}/>
            {formErrors.terms&&<p>{formErrors.terms}</p>}
            <button type="submit">Register</button>
            </form>
            <p>Already have an account</p><NavLink to='/login'>Login</NavLink>
        </div>
    )
}
export default Register;