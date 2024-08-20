import React, { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom"
// import boy from "./boy.png";
export default function Loginuser() {
  const navigate = useNavigate()
  const [userdata, setuserdata] = useState({
    email: "",
    password: ""
  })
  const handleData = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value })
  }


  const Login = async (e) => {
    e.preventDefault()
    const { email, password } = userdata

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    await res.json();
    if (res.status === 400) {
      console.log("Invalid Credential");
    }
    else if (res.status === 422) {
      console.log("Fill the from");
    }
    else {
      console.log("Success");

      navigate("/todo")
    }
  }
  return (
    <>
      <div className='background'><div className='transbox'>
      
      <div className='form1'>
          {/* <img style={{height:450}} src={boy} alt="" /> */}
        <div className='form'>
          <div class="title">Login</div>
          <form method="post">
            <div className="input-container ic1">
              <input placeholder="Usename" type="email" name="email" onChange={handleData} className="input" id="username" />
            </div>
            <div className="input-container ic2">
              <input placeholder="Password" type="password" name="password" onChange={handleData} className="input" id="password" />
            </div>
            <button className='submit' onClick={Login}>Login</button>
            <div className='shatru1'>
            <NavLink className='shatru' to="/">Register </NavLink>
            </div>
              <button className="social-btn">
                <span className="social-logo-wrapper">
                  <img
                    className="social-logo"
                    src="https://th.bing.com/th?id=ODLS.79b840fb-42fb-47d2-a6d5-809f44ac96ea&w=32&h=32&qlt=94&pcl=fffffa&o=6&pid=1.2"
                    alt="Google logo"
                  />

                  
                </span>
                <span className="social-text">Login with Facebook</span>
              </button>
              <button className="social-btn">
                <span className="social-logo-wrapper">
                  <img
                    className="social-logo"
                    src="https://auth.openai.com/assets/google-logo-NePEveMl.svg"
                    alt="Google logo"
                  />
                </span>
                <span className="social-text">Login with Google</span>
              </button></form>
        </div>
        </div></div>
      </div>





      {/* <form method="post">
        <input type="text" name="userName" onChange={handleData} placeholder='UserNAme' />
        <input type="password" name="password" onChange={handleData} placeholder='Password' />
        <button onClick={Login}>Submit</button>

        <NavLink to="/">Signup </NavLink>
      </form> */}
    </>
  )
}
