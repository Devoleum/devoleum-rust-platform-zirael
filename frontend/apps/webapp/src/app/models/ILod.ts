export interface ILod {
  name: string;
  description: string;
  section?: string;
  image: string;
  randomValue?: string;
  thumbnail: string;
  date?: string;
  network_link?: string;
  merchant?: ILod;
}
