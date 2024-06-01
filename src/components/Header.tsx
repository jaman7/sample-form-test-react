import { FaReact } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nawigate = useNavigate();

  const handleRedirect = (path: string) => {
    nawigate(path);
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={() => handleRedirect('/home')}>
        <FaReact />
      </div>
    </header>
  );
};

export default Header;
