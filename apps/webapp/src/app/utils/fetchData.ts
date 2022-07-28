import { IHistory } from '../models/IHistory';
import { Merchant } from '../models/ILod';
import { IStep } from '../models/ISteps';
import returnMatchLang from './returnMatchLang';

const getMerchant = async (id: string): Promise<Merchant> => {
  const url = `/api/users/merchant/${id}`;
  const response = await fetch(url);
  const uri: string = await response.json();
  const { localizedData } = await returnMatchLang(uri);
  return localizedData;
};

const getOnce = async (item: IHistory | IStep, getMerchant = false) => {
  const { localizedData } = await returnMatchLang(item.uri);
  item.data = localizedData;

  if (getMerchant) {
    const merchantReq = await fetch('/api/users/merchant/' + item.user['$oid']);
    const merchantUri = await merchantReq.json();
    const { localizedData } = await returnMatchLang(merchantUri);
    item.data.merchant = localizedData;
  }

  return item.data;
};

const getIterate = async (
  items: IHistory[] | IStep[],
  getMerchant = false
): Promise<IHistory[] | IStep[]> => {
  await Promise.all(
    items.map(async (el: IHistory | IStep, i: number) => {
      const { localizedData } = await returnMatchLang(items[i].uri);
      items[i].data = localizedData;
      if (getMerchant) {
        const merchantReq = await fetch(
          '/api/users/merchant/' + items[i].user['$oid']
        );
        const merchantUri = await merchantReq.json();
        const { localizedData } = await returnMatchLang(merchantUri);
        items[i].data.merchant = localizedData;
      }
    })
  );
  return items;
};

export { getOnce, getIterate, getMerchant };
