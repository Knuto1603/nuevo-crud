import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="authLayout">
            <div className="authContainer">
                <div className="authCard">
                    
                    <div className="branding">
                        <h1 className="title">{title}</h1>
                        {subtitle && <p className="subtitle">{subtitle}</p>}
                    </div>
                    
                    <div className="formContainer">
                        {children}
                    </div>
                </div>
            </div>
            
            {/* Background decorativo */}
            <div className="background"></div>
        </div>
    );
};

export default AuthLayout;