import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './i18n';
import Loader from 'common/Loader';
import Header from 'components/Header';
import Home from 'view/Home';
import Trucks from 'view/trucks/Trucks';
import { useLoading } from 'core/loading/LoadingContext';

const App = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <BrowserRouter>
        <div className="layout">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/trucks" element={<Trucks />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      {isLoading && <Loader />}
    </>
  );
};

export default App;
