import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar style={{ background: '#92AF31', height: '60px' }}>
        <Container>
          <Link to="/">
            <Navbar.Brand
              style={{
                color: 'white',
                position: 'absolute',
                top: '12px',
                left: '80px',
              }}
            >
              Devoleum
            </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
