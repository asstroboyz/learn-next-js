import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/pages/crud/index');
  };

  return (
    <button onClick={handleClick}>Pindah ke Halaman Lain</button>
  );
}

export default MyComponent;
