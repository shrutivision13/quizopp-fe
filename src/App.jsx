import './App.css';
import './styles/common.css';
import Wrapper from './layout/Wrapper/Wrapper.jsx';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routing/route.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={<Wrapper>{element}</Wrapper>} />
        ))}
      </Routes>
    </>
  );
}

export default App;
