import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div
        style={{ background: '#92AF31', height: '60px', textAlign: 'center' }}
      >
        <Link to="/">
          <div className="navbar-brand">Devoleum</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
