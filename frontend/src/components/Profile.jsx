import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from "../assets/profile-pictures/favicon.ico";
import MainDeck from '../pages/MainDeck';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Keep your existing useEffect logic exactly the same
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://stocks-backend-fdcd.onrender.com/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.status === 401) {
          console.error("Unauthorized, redirecting to login...");
          navigate("/login");
          return;
        }
    
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="font-mono relative max-w-[100%] h-full flex flex-col mx-3 py-5 justify-start space-y-5 text-[#2ca5eb] border-[#237da7] border-r-2 bg-black/50 backdrop-blur-md">
      {/* Sci-fi animated border */}
      
      <div className="absolute inset-0 border-2 border-[#237da7] opacity-70">
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
      </div>
    
      {/* User profile with sci-fi elements */}
      <div className='flex flex-col justify-center items-center relative z-10'>
        {/* Holographic avatar */}
        <div><MainDeck/></div>
        
        <div className="relative mb-3">
          <img 
            src={bg} 
            alt="user" 
            className='rounded-full h-20 w-20 border-2 border-[#237da7] object-cover'
          />
          <div className="absolute inset-0 rounded-full border-2 border-[#237da7] opacity-50 animate-[pulse_3s_infinite]"></div>
        </div>

        {/* Animated greeting text */}
        <h3 className="text-lg font-mono mb-2 animate-[textShadow_2s_infinite_alternate]">
          {user ? `IDENTIFICATION CONFIRMED` : `SCANNING...`}
        </h3>

        {/* User data with terminal effect */}
        <div className="font-mono text-sm bg-black/30 p-2 rounded-lg border h-auto border-[#237da7]/30">
          {user ? (
            <>
              <p className="text-[#00FFFF]"> USERNAME: <span className="text-[#237da7]">{user.name}</span></p>
              <p className="text-[#00FFFF]"> ACCESS LEVEL: <span className="text-[#237da7]">DELTA CLEARANCE</span></p>
              <p className="text-[#00FFFF]"> LAST LOGIN: <span className="text-[#237da7]">{(new Date()).toLocaleString()}</span></p>
            </>
          ) : (
            <p className="text-[#00FFFF]"> LOADING BIOSCAN DATA...</p>
          )}
        </div>

      </div>

      {/* Navigation with sci-fi effects */}
      <div className="space-y-3 mt-5 relative z-10">
        <Link 
          to="/dashboard" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#193c53] transition-all duration-300 group"
        >
          <span className="text-[#00FFFF] font-mono mr-2"></span>
          <span className="group-hover:text-white">DASHBOARD</span>
        </Link>
        <Link 
          to="/stocks" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#237da7] transition-all duration-300 group"
        >
          <span className="text-[#00FFFF] font-mono mr-2"></span>
          <span className="group-hover:text-white">STOCK NETWORK</span>
        </Link>
        <Link 
          to="/spacex" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#237da7] transition-all duration-300 group"
        >
          <span className="text-[#00FFFF] font-mono mr-2"></span>
          <span className="group-hover:text-white">SPACEFLIGHT CONTROL</span>
        </Link>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-[#FFD700] rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Add these styles to your global CSS */}
      
    </div>
  );
}

export default Profile;
