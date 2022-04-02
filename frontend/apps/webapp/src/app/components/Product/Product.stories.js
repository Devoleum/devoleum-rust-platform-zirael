import Product from './Product';

export default {
  component: Product,
  title: 'Product',
};

const histObj = {
  "public": true,
  "featured": null,
  "rating": 0,
  "num_reviews": null,
  "_id": {
    "$oid": "5ffb87240fd1c30004878d7e"
  },
  "user": {
    "$oid": "5ffb86c50fd1c30004878d7d"
  },
  "name": "Inserrata Olive Oil Campaign 2020",
  "uri": "https://raw.githubusercontent.com/Digitalele/Devoleum_Inserrata/master/olive-oil-campaign-2020.json",
  "category": "food",
  "createdAt": {
    "$date": {
      "$numberLong": "1610319652367"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1610319652367"
    }
  },
  "__v": 0,
  "data": {
    "name": "Inserrata Campagna Olivicola 2020",
    "description": "L'olio extravergine d'oliva della Inserrata è un prodotto di categoria superiore 100% Toscano, che proviene dai nostri oliveti situati in collina a 150 metri sul livello del mare, di varietà Frantoiano, Leccino, Moraiolo, Coratina e Pendolino. Gli oliveti sono coltivati con metodo biologico. Le piante hanno un età che va dai 15 a 100 anni",
    "image": "https://raw.githubusercontent.com/Digitalele/Devoleum_Inserrata/master/imgs/2020.jpg",
    "randomValue": "Zi65fv@!",
    "thumbnail": "https://raw.githubusercontent.com/Digitalele/Devoleum_Inserrata/master/imgs/small_2020.jpg",
    "date": "21/10/2020",
    "merchant": {
      "name": "Inserrata",
      "description": "Inserrata, è un’azienda a conduzione familiare specializzata nell’agricoltura biologica che dal 1997 si dedica con passione alla coltivazione delle proprie terre. Immersa nella magnifica natura Toscana, si differenzia per qualità e stile, rispettando e salvaguardando l’ambiente in tutte le sue biodiversità.Caratterizzata da una forte passione artistica, l’azienda Toscana si distingue per la sua creatività, diffondendo valori che vanno ben oltre l’agricoltura. Da alcuni anni, collabora con artisti provenienti da tutta Europa, organizzando speciali mostre di fotografia, arte e design.",
      "website_url": "https://inserrata.it/",
      "image": "https://raw.githubusercontent.com/Digitalele/Devoleum_Inserrata/master/imgs/logo.jpg",
      "thumbnail": "https://raw.githubusercontent.com/Digitalele/Devoleum_Inserrata/master/imgs/logo.jpg"
    }
  }
}

const Template = (args) => <Product {...args} />;

export const Primary = Template.bind({});
Primary.args = { product: histObj };
