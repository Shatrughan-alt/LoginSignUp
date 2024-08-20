import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleData = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }

    const Adder = async (e) => {
        e.preventDefault();
        const { email, password } = userdata;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (res.status === 400) {
            setError("Shop already present");
        } else if (res.status === 422) {
            setError("Please fill out the form completely.");
        } else if (res.status === 200) {
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);  // Navigate after 1.5 seconds
        } else {
            setError("Unexpected error occurred");
        }
    }

    return (
        <>
            <div className='background'>
                <div className='transbox'>
                    <div className='form1'>
                        <div className='form'>
                            <div className="title">Signup</div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            <form method="post">
                                <div className="input-container ic1">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        onChange={handleData}
                                        value={userdata.email}
                                        className="input"
                                        id="email"
                                    />
                                </div>
                                <div className="input-container ic2">
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={handleData}
                                        value={userdata.password}
                                        className="input"
                                        id="password"
                                    />
                                </div>
                                <button className='submit' onClick={Adder}>Register</button>
                                <div className='shatru1'>
                                    <NavLink className='shatru' to="/login">Login </NavLink>
                                </div>
                                <button className="social-btn">
                                    <span className="social-logo-wrapper">
                                        <img
                                            className="social-logo"
                                            src="https://auth.openai.com/assets/google-logo-NePEveMl.svg"
                                            alt="Google logo"
                                        />
                                    </span>
                                    <span className="social-text">Login with Google</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
