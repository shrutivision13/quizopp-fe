import React from 'react';
import { useLocation } from 'react-router-dom';

import '../../styles/components/header/header.css';

import logo from '../../assets/images/quizzop-logo-dark.svg';
import sidearrow from '../../assets/images/side-arrow.svg';
import bellGif from '../../assets/images/bell-new.gif';

const Header = () => {

    const location = useLocation();

    const navHeaderRoutes = ['/login', '/login/phone'];
    const isNavHeader = navHeaderRoutes.includes(location.pathname);

    return isNavHeader ? (
        <nav
            id="navbar"
            className="h-60 fixed z-99 top-0 max-w-maxW w-full duration-350 shadow-norma bg-C26284C"
            style={{ top: '0px' }}
        >
            <div className="flex flex-row justify-between items-center h-full pr-20">
                <div className="flex flex-row items-center flex-1 pl-16">
                    <div
                        data-testid="top-back-nav-button"
                        className="py-14 pr-4 flex justify-center cursor-pointer"
                    >
                       <img src={sidearrow} alt="" />
                    </div>
                    <div className="py-10">
                        <h1 className="text-14 font-bold dark:text-CFFFFFF">Back</h1>
                    </div>
                </div>
                <div className="ml-20 cursor-pointer" data-testid="bell-icon">
                    <img
                        alt="bell"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        src={bellGif}
                        style={{ color: 'transparent' }}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full"></div>
        </nav>
    ) : (
        <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
            <div className="flex flex-row justify-between items-center h-full px-20">
                <div className="mr-10 h-30 flex flex-auto items-center justify-center">
                    <img src={logo} alt="Quizzop" width="100" height="18" />
                </div>
            </div>
        </header>
    );
}

export default Header;
