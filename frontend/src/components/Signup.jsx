import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import signbg from '../assets/signbg.jpg';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const result = await axios.post('https://stocks-backend-fdcd.onrender.com/api/signup', { name, email, password });
    
            if (result.data.message === "Success") {
                console.log("Signup Successful!");
                setName(""); 
                setEmail("");
                setPassword("");
                navigate('/login'); 
            } else {
                alert(result.data.message); // ✅ Shows backend error (e.g., "Email already registered")
            }
        } catch (err) {
            console.error(err);
            alert("Signup failed. Try again later.");
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
        <div style={myStyle} className="min-h-screen flex items-center justify-center text-white">
            <div className="w-full max-w-md p-8 bg-transparent backdrop-blur-lg bg-opacity-80 rounded-2xl shadow-lg border border-transparent">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-cyan-300 mb-1">Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            autoComplete="off"
                            value={name}
                            className="w-full p-3 bg-inherit rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            autoComplete="off"
                            value={email}
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
                            value={password}
                            className="w-full p-3 bg-inherit rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-400">Already a User...?</p>
                <Link to='/login' className="block text-center text-cyan-400 hover:underline">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
