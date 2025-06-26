import React from 'react';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import NavBar from '../../common/navbar/NavBar';
import Main from '../../common/main/Main';
import './MainLayout.css';

const MainLayout = ({ children, title = "Mi App" }) => {
    return (
        <div className="layout-grid">
            <div className="superior">
                <Header title={title} />
                <NavBar />
            </div>
            <div className="container">
                <Main className="content">
                    {children}
                </Main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;