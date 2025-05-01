import './App.css';
import './styles/common.css';
import Wrapper from './layout/Wrapper/Wrapper.jsx';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routing/route.jsx';

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
