import React, { useState, useEffect } from 'react';
import Meta from '../../components/Meta/Meta';
import Loader from '../../components/Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';

import LocalizedStrings from 'react-localization';
import { IHistory } from '../../models/IHistory';
import { getIterate, getMerchant, getOnce } from '../../utils/fetchData';
import axios from 'axios';

const MerchantScreen = () => {
  let { id } = useParams();

  const [merchantData, setMerchantData] = useState<any>(null);
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDetails();
    getItems();
  }, []);

  const getDetails = async () => {
    try {
      const data = await getMerchant(id || '');
      console.log(data);
      setMerchantData(data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  const getItems = async () => {
    try {
      const result = await axios.get(`/api/histories/merchant/${id}`);
      const histories = (await getIterate(result.data)) as IHistory[];
      setHistories(histories);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  if (!merchantData || loading) {
    return <Loader />;
  }

  return (
    <>
      <Meta title={merchantData.name} img_url={merchantData.image} />
      <div className="row" style={{ marginBottom: '15px' }}>
        <div className="col col-md-6">
          <img
            src={merchantData.image}
            alt={merchantData.name}
            className="img-fluid"
          />
        </div>
        <div className="col col-md-6">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <h3>{merchantData.name}</h3>
              <strong>
                <a href={merchantData.website_url} target="_blank">
                  Website link
                </a>
              </strong>
            </div>

            <div className="list-group-item">{merchantData.description}</div>
          </div>
        </div>
      </div>
      {merchantData.network_name && (
        <div className="row align-items-center">
          <div className="col">
            <h3>Network</h3>
            <Product
              product={{
                data: {
                  name: merchantData.network_name,
                  description: merchantData.network_description,
                  image: merchantData.network_image,
                  thumbnail: merchantData.network_thumbnail,
                  network_link: merchantData.network_link,
                },
              }}
              fullText={true}
            />
          </div>
        </div>
      )}

      <div className="row align-items-center">
        <div className="col">
          <h3>{strings.sub}</h3>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <>
          {histories.length === 0 ? (
            'No histories found'
          ) : (
            <>
              {histories.map((devoleumHistory: any) => (
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
      )}
    </>
  );
};

export default MerchantScreen;

const strings = new LocalizedStrings({
  en: {
    sub: 'Stories',
  },
  it: {
    sub: 'Storie',
  },
  fr: {
    sub: 'histoires',
  },
});
