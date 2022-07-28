export interface BasicData {
  uri: string;
  name: string;
  data: ILod;
}

export interface ILod {
  name: string;
  description: string;
  section?: string;
  image: string;
  randomValue?: string;
  thumbnail: string;
  date?: string;
  network_link?: string;
  merchant?: Merchant;
}

export interface BasicData {
  uri: string;
  name: string;
  data: ILod;
}

export interface MerchantWrapper {
  uri: string;
  name: string;
  email: string;
  data: Merchant;
}

export interface Merchant {
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  website_url: string;
  network_name?: string;
  network_link?: string;
  network_description?: string;
  network_image?: string;
  network_thumbnail?: string;
}
