import Wrapper from './layout/Wrapper/Wrapper.jsx';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routing/route.jsx';
import TermsofUse from './pages/FooterPages/TermsofUse/index.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PrivacyPolicy from './pages/FooterPages/PrivacyPolicy/index.jsx';

import './App.css';
import './styles/common.css';

function App() {

  return (
    <>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={<Wrapper>{element}</Wrapper>} />
        ))}
        <Route path={'/termsofuse'} element={<TermsofUse />} />
        <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
