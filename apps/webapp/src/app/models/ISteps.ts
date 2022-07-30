import { ILod } from './ILod';

export interface IStep {
  public: boolean;
  featured: boolean;
  main_eth_notarization: string;
  test_eth_notarization: string;
  main_algo_notarization: string;
  polygon_matic_notarization: string;
  polygon_matic_v2_notarization: string;
  sepolia_test_eth_notarization: string;
  test_algo_notarization: string;
  bitcoin_notarization: string;
  ipfs_notarization: string;
  _id: Id;
  user: User;
  name: string;
  uri: string;
  randomizeProof: string;
  historyId: HistoryId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  hash: string;
  data: ILod;
}

export interface Id {
  $oid: string;
}

export interface User {
  $oid: string;
}

export interface HistoryId {
  $oid: string;
}
