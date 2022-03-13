import React from "react";
import { Row, Col } from "react-bootstrap";
import Contacts from "../components/Contacts";

import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    back: "Go Back",
    by: "by",
    title: "Steps",
    content:
      "The platform is in early access, mass registration is temporarily disabled to ensure a quality and safe experience for everyone. If you want to be a Devoleum Early Adopter, please contact us. Devoleum remains open to all as it is {0}, you can clone the platform repository and try it, modify it and definitely improve it :)",
  },
  it: {
    back: "Indietro",
    by: "di",
    title: "Passaggi",
    content:
      "Visto lo stato early access della piattaforma, la registrazione in massa è disabilitata temporaneamente per garantire a tutti un'esperienza di qualità e sicura. Se vuoi essere un* Early Adopter di Devoleum, contattaci. Devoleum rimane aperto a tutti essendo {0}, puoi clonare la repository della piattaforma e provarla, modificarla e sicuramente migliorarla :)",
  },
});

const EarlyRegister = () => {
  return (
    <>
    <Row style={{ marginBottom: "15px" }}>
      <Col md={8}>
        <div style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
          <h2>Early Access</h2>
          {strings.formatString(
            strings.content,
            <a
              href="https://github.com/Devoleum"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source
            </a>
          )}
        </div>
      </Col>
    </Row>
    <Contacts />
    </>
  );
};

export default EarlyRegister;
