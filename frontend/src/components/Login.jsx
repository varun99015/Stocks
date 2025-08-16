import { useState } from "react";
import { Link } from "react-router-dom";

import {useNavigate} from 'react-router-dom';
import signbg from '../assets/signbg.jpg';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("https://stocks-backend-fdcd.onrender.com/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login response:", data);

            if (data.status === "Success") {
                // ✅ Correctly navigate using the useNavigate hook
                navigate("/home/explore");
            } else {
                alert(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            alert("An error occurred during login. Please check your network connection.");
        }
    };
      

const myStyle = {
    backgroundImage: `url(${signbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Example height
    width: "100%",
  };

    return (
        <>
        
        <div  style={myStyle} className="min-h-screen flex items-center justify-center  text-white ">
            <div className=" w-full max-w-md p-8 bg-opacity-80 rounded-2xl shadow-lg shadow-slate-900  bg-transparent backdrop-blur-[10px]">
                <h2 className="text-3xl font-bold text-center text-[#46e99a] mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-cyan-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            autoComplete="on"
                            className="w-full p-3 bg-inherit rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            autoComplete="off"
                            className="w-full p-3 bg-inherit text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-400">A New User..?</p>
                <Link to='/register' className="block text-center text-cyan-400 hover:underline">Sign Up</Link>
            </div>
        </div></>
    );
}

export default Login;
