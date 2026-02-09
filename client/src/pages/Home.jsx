import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Home = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();


    return (
        <div className="-mt-20"> {/* Negative margin to pull hero behind navbar */}
            {/* Hero Section */}
            <section className="relative bg-hero-pattern bg-cover bg-center h-screen flex items-center justify-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 neon-text">Welcome to Ev app</h1>
                    </div>
                </div>
            </section>


                                

               

                   
                        
                    
        </div>
    );
};


export default Home;
