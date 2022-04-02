import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container
        style={{ fontSize: '0.6em', wordBreak: 'break-all', maxWidth: '90%' }}
      >
        <div className="row">
          <div className="col text-center  py-3">Copyright &copy; Devoleum</div>
        </div>
        <div className="row">
          <div className="col text-center">>Donate to</div>
        </div>
        <div className="row">
          <div className="col text-center">>
            ETH: 0xbf8d0d4be61De94EFCCEffbe5D414f911F11cBF8
          </div>
        </div>
        <div className="row">
          <div className="col text-center">>
            ALGO: 5N22O3PIXAGNAGHBFSU6HQ22KGI4D3XEBACEFODVH3UOKCA4C2IBRD4ZDE
          </div>
        </div>
        <br />
      </Container>
    </footer>
  );
};

export default Footer;
