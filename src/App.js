import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
 const initialValue = { username : "", email : "", password : ""}

 const [formValues, setFormValues] = useState(initialValue)
 const [formErrors, setFormErrors] = useState({})
 const [isSubmit, setIsSubmit] = useState(false)


 const handleChange= (e)=>{
   const {name, value} = e.target
   setFormValues({...formValues, [name] : value})
 }

 const handleSubmit = (e)=>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
 }
useEffect(()=>{
   if(Object.keys(formErrors).length === 0 && !isSubmit){
    console.log(formValues)
   }
}, [formErrors])


const validate = (values) => {
   const errors = {}
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!values.username){
     errors.username = "Username is required"
   }
   if(!values.email){
    errors.email = "Email is required"
  }
   else if(!regex.test(values.email)){
    errors.email = "This is not a valid email"
  }
  if(!values.password){
    errors.password = "Password is required"
  }
  else if(values.password.length < 4){
    errors.password = "Password must be more than 4 characters"
  }
  else if(values.password.length > 10){
    errors.password = "Password must be less than 10 characters"
  }
  return errors
}

  return (
    <>
    {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="sucess">Successfully logged in</div>) : ("")}
    
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={formValues.username}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formValues.email}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
            />
          </div>
          <p>{formErrors.password}</p>
          <button>Submit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default App;
