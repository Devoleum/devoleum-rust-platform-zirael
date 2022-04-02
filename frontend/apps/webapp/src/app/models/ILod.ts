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

export interface Merchant {
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  website_url: string;
  network_name: string;
  network_link: string;
  network_description: string;
  network_image: string;
  network_thumbnail: string;
}
