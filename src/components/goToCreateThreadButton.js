import { useNavigate } from 'react-router-dom';

const GoToCreateThreadButton = () => {
  const navigate = useNavigate();

  const goToCreateThread = () => {
    navigate('/thread/new');
  };

  return (
    <button className='inline-tag' onClick={goToCreateThread}>新しいスレッドを立てる</button>
  );
};

export default GoToCreateThreadButton;
