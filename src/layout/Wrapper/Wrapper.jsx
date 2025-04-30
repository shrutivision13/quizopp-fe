import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../styles/components/wrapper/wrapper.css';
import BackgroundWrapper from '../../components/BackgroundWrapper/BackgroundWrapper';

const Wrapper = ({ children }) => {
  return (
    <BackgroundWrapper>
      <div className="flex flex-col pt-60 h-get-started position-relative justify-between">
        <Header />
        {children}
        <Footer />
      </div>
    </BackgroundWrapper>
  );
};

export default Wrapper;
