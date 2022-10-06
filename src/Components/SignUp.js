import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
const SignUp = (props) => {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let history = useNavigate();
   const handleSubmit=async(e)=>{
         e.preventDefault();
         
         const {name,email,password}=credentials
         const response = await fetch("http://localhost:5000/api/auth/createuser", {
         
           method: 'POST', 
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({name,email,password}) 
         });
         const json  = await response.json();
         console.log(json)

           if(json.success)
           {
                      // save the auth token and redirect redirect
              localStorage.setItem('token',json.authtoken);
              history("/");       // history.push("/")   usehistory has been replaced with useNavigate
              props.showAlert("Account created successfully","success")
           }
           else
           {
              props.showAlert("Invalid Credentials","danger")
           }
        
       
      
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    
        <div className='container mt-3'>
         <h2>Create your account on iNoteBook</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>

                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required placeholder="Password"/>
                </div>
                <div className="form-group">
                <label htmlFor="cpassword">Confirn password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required  placeholder="Confirm password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  
  )
}

export default SignUp
