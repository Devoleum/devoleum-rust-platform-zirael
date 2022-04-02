import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import LocalizedStrings from 'react-localization';
import { IHistory } from '../../models/IHistory';
import { getIterate } from '../../utils/fetchData';
import axios from 'axios';

const HomeScreen: React.FC = () => {
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const result = await axios.get('/api/histories/public');
      const histories = (await getIterate(result.data, true)) as IHistory[];
      setHistories(histories);
      console.log('histories: ', histories);
    } catch (error) {
      setError(error);
      console.log('error: ', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Meta />
      <div>
        <div>
          {strings.formatString(
            strings.content,
            <a
              href="https://github.com/Devoleum"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source
            </a>
          )}{' '}
          <a
            href="https://www.devoleum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text_more"
          >
            {strings.goWeb}.
          </a>
        </div>
      </div>
      <h1>{strings.sub}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <>
          {histories &&
            histories.map((devoleumHistory: any) => (
              <div key={devoleumHistory._id}>
                {devoleumHistory.data && (
                  <Link
                    to={`/history/${devoleumHistory._id['$oid']}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Product product={devoleumHistory} />
                  </Link>
                )}
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default HomeScreen;

const strings = new LocalizedStrings({
  en: {
    title: 'Welcome',
    content: `Devoleum is a {0} web app that organizes data from physical or digital supply chains into authentic stories. Thanks to Devoleum it is possible to notarize the steps of a supply chain in an immutable way on blockchains and other distributed systems, using cryptographic hashes that allow data verification and a high degree of privacy. Each story shows in a clear and detailed way the steps that contributed to making the product unique and precious.`,
    sub: 'Featured stories',
    goWeb: 'Visit Devoleum website for more information',
  },
  it: {
    title: 'Benvenutə',
    content:
      'Devoleum è una web app {0} che organizza i dati provenienti da filiere fisiche o digitali in storie vive e autentiche. Grazie a Devoleum è possibile notarizzare i passaggi di una filiera in maniera immutabile su blockchain ed altri sistemi distribuiti, utilizzando hash crittografici che permetteno la verifica del dato e un alto grado di privacy. Ogni storia mostra in modo chiaro e dettagliato i passaggi che hanno contribuito a rendere il prodotto unico e prezioso.',
    sub: 'Storie in primo piano',
    goWeb: 'Visita il sito di Devoleum per maggiori informazioni',
  },
  fr: {
    title: 'Welcome',
    content:
      "Devoleum est un web app {0} qui organise les données des chaînes d'approvisionnement physiques ou numériques en histoires vivantes et authentiques. Grâce à Devoleum, il est possible de notariser les étapes d'une chaîne d'approvisionnement de manière immuable sur les blockchains et autres systèmes distribués, en utilisant des hachages cryptographiques qui permettent la vérification des données et un degré élevé de confidentialité. Chaque histoire montre de manière claire et détaillée les étapes qui ont contribué à rendre le produit unique et précieux.",
    sub: 'Articles en vedette',
    goWeb: "Visitez le site Web de Devoleum pour plus d'informations",
  },
});
