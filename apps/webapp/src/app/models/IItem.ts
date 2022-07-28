export interface IItem {
    _id: Id
    public?: boolean
    featured?: boolean
    rating?: number
    numReviews?: number
    user: Id
    name: string
    uri: string
    category?: string
    reviews?: any[]
    createdAt: Date
    updatedAt: Date
    __v: number
  }

  export interface Root {
    _id: Id
    public: boolean
    featured: boolean
    main_eth_notarization: any
    test_eth_notarization: any
    main_algo_notarization: any
    test_algo_notarization: any
    bitcoin_notarization: any
    ipfs_notarization: any
    user: Id
    name: string
    uri: string
    randomizeProof: string
    historyId: Id
    createdAt: Date
    updatedAt: Date
    __v: number
  }
  
  export interface Id {
    $oid: string
  }

  export interface Date {
    $date: string
  }