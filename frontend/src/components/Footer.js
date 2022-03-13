import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container style={{fontSize: '0.6em', wordBreak: 'break-all ', maxWidth: '90%'}}> 
        <Row>
          <Col className="text-center py-3">Copyright &copy; Devoleum</Col>
        </Row>
        <Row>
          <Col className="text-center">Donate to</Col> 
        </Row>
        <Row>
          <Col className="text-center">ETH: 0xbf8d0d4be61De94EFCCEffbe5D414f911F11cBF8</Col> 
        </Row>
        <Row>
          <Col className="text-center">ALGO: 5N22O3PIXAGNAGHBFSU6HQ22KGI4D3XEBACEFODVH3UOKCA4C2IBRD4ZDE</Col>
        </Row>
        <br />
      </Container>
    </footer>
  );
};

export default Footer;
