import returnMatchLang from './returnMatchLang'

const getOnce = async (item, getMerchant = false) => {
  const {localizedData} = await returnMatchLang(item.uri)
  item.data = localizedData;
  console.log("item get: ", item.data)

  if (getMerchant) {
    const merchantReq = await fetch('/api/users/merchant/' + item.user)
    const merchantUri = await merchantReq.json();
    const {localizedData} = await returnMatchLang(merchantUri)
    console.log("localizedMerchantData get: ", localizedData)
    item.data.merchant = localizedData;
  }

  return item.data;
};

const getIterate = async (items, getMerchant = false) => {
  await Promise.all(
    items.map(async (el, i) => {
        const {localizedData}= await returnMatchLang(items[i].uri)
        items[i].data = localizedData;
          if (getMerchant) {
          const merchantReq = await fetch('/api/users/merchant/' + items[i].user)
          const merchantUri = await merchantReq.json();
          const {localizedData} = await returnMatchLang(merchantUri)
          items[i].data.merchant = localizedData;
        }
      //items[i].calcHash = await keccak(JSON.stringify(items[i].data), 256);
    })
  );
  return items;

};

export { getOnce, getIterate };
