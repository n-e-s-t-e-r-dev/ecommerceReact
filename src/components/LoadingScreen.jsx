import React from 'react';
import '../styles/Loading-screen.css'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;