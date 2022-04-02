import { IHistory } from '../models/IHistory';
import { IStep } from '../models/ISteps';
import returnMatchLang from './returnMatchLang';

const getOnce = async (
  item: IHistory | IStep,
  getMerchant: boolean = false
) => {
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
  getMerchant: boolean = false
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

export { getOnce, getIterate };
