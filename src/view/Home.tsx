import { useNavigate } from 'react-router-dom';
import { PiTruck } from 'react-icons/pi';
import Button from 'common/Button';

const Home = () => {
  const nawigate = useNavigate();
  const handleRedirect = (path: string) => {
    nawigate(path);
  };

  return (
    <div>
      <Button handleClick={() => handleRedirect('/trucks')} className="flat filled ms-2" round={true} tooltip="View">
        <PiTruck />
      </Button>
    </div>
  );
};

export default Home;
