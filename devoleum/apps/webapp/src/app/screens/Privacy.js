import React from "react";
import { Row, Col } from "react-bootstrap";

const Privacy = () => {
  return (
    <Row style={{ marginBottom: "15px" }}>
      <Col md={8}>
        <div style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
          <h2>Privacy</h2>
          {`   
Diamo valore alle parole privacy e trasparenza fornendo un’applicazione web priva di tracker, la quale in controtendenza sposta l’asimmetria dell’informazione totalmente a favore del visitatore. Devoleum non colleziona i dati dei visitatori in nessun modo, di conseguenza non li immagazzina e non li può condividere.

La piattaforma di Devoleum è sviluppata per mostrare dati già pubblici, l’utente può informarsi liberamente sulle filiere mostrate senza temere di essere tracciato o spiato.

Devoleum chiede all’utente che si registra solo una password, un nome ed una username può essere una qualsiasi stringa di caratteri a scelta dell’utente. Questi dati servono per permettere all’utente di autenticarsi nel caso volesse utilizzare devoleum per mostrare una o più filiere.

Devoleum si divide in tre sezioni da poter mostrare, il profilo delle aziende, la descrizione della storia, i singoli passaggi della storia. Ognuna di questi tre sezioni richiede solamente un link ad un file Json già reso pubblico dall’utente su un servizio di hosting esterno alla nostra piattaforma.

Devoleum si limita ad indicizzare dei link, così l’utente è libero di utilizzare o no Devoleum senza alcun tipo di lock in, semplicemente inserendo o togliendo un link ad un file pubblico.

La notarizzazione quando richiesta avviene immettendo all’interno di un sistema distribuito una prova crittografica (hash), la quale non è frutto diretto del contenuto del dato ma è anonimizzata aggiungendo un valore casuale. Questo sistema garantisce una via d’uscita anche nel caso di sistemi distribuiti che mirano all’immutabilità del dato. Il dato notarizzato sarà quindi una prova facilmente verificabile, anonimizzata e senza possibilità di ricostruire il dato originale senza averne già il possesso.

Non è possibile cancellare da parte nostra la prova immessa su Ethereum Blockchain, ma è possibile cancellare i dati presenti sul nostro database che permettono di verificarla (hash, valore randomico e link al JSON), rendendo di fatto la prova notarizatta su Ethereum Blockchain un dato inutilizzabile ed anomimo.

La richiesta di cancellazione da parte dell'utente dei dati immessi relativi a storie e passaggi è eseguita immediatamente. La cancellazione dei dati precedentemente menzionati è semplice e può essere eseguita in qualsiasi momento dall'utente stesso. Nel caso della richiesta di cancellazione dei dati del profilo bisognerà contattarci, avvenuta la richiesta procederemo alla cancellazione, questo perché una cancellazione immediata del profilo utente non è possibile per ragioni di sicurezza e tecniche.

Sia il database (dei cluster di MongoDb) che il server sono locati in Unione Europea. La rete Ethereum Blockchain è fatta di nodi distribuiti in tutto il mondo su cui non abbiamo alcun potere di intevento.

Per ulteriori verifiche è possibile visionare il codice open source sul GitHub di Devoleum.`}
        </div>
      </Col>
    </Row>
  );
};

export default Privacy;
