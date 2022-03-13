import React from "react";
import LocalizedStrings from "localized-strings";
import { Button } from "react-bootstrap";

let strings = new LocalizedStrings({
  en: {
    title: "Contact Us",
    name: `Name`,
    message: "Message",
    send: "Send",
  },
  it: {
    title: "Contattaci",
    name: `Nome`,
    message: "Messaggio",
    send: "Invia",
  },
  fr: {
    title: "Contact",
    name: `Prénom`,
    message: "Message",
    send: "Envoyer",
  },
});

const inputStyle = {
  border: "none",
  borderBottom: "1px solid black",
  padding: "10px",
  width: "300px",
};
export default function Contacts() {
  return (
    <div>
      <h2 className="title">{strings.title}</h2>
      <form
        action="https://formcarry.com/s/zq4MG7gYIli"
        method="POST"
        accept-charset="UTF-8"
      >
        <label class="form-label" for="input-example-1">
          Email
        </label>
        <br />
        <input style={inputStyle} type="email" name="email" />
        <br />
        <br />
        <label class="form-label" for="input-example-1">
          {strings.name}
        </label>
        <br />
        <input style={inputStyle} type="text" name="contactName" />
        <br />
        <br />
        <label class="form-label" for="input-example-1">
          {strings.message}
        </label>
        <br />
        <textarea
          style={{ width: "300px", minHeight: "150px", padding: "10px" }}
          name="message"
          rows="3"
        ></textarea>
        <br />
        <br />
        <Button
          style={{
            border: "none",
            padding: "15px",
            width: "300px",
            color: "white",
          }}
          type="submit"
          variant="success"
        >
          {strings.send}
        </Button>
      </form>
    </div>
  );
}
