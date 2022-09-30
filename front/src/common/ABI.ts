import { AbiItem } from "web3-utils";
import Web3 from "web3";
/* 
[컨트랙트 ABI]
- 작성한 스마트 컨트랙트의 컴파일 결과로부터 얻은 ABI(in JSON)를 복사하여 붙여넣습니다.
- NFT_ABI: JAV_NFT 컨트랙트 ABI
- SALE_FACTORY_ABI: SALE Factory 컨트랙트 ABI
- SALE_ABI: SALE 컨트랙트 ABI
- TOKEN_ABI : JavToken 컨트랙트 ABI
*/
export const ABI = {
  CONTRACT_ABI: {
    NFT_ABI: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "createNFT",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "current",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "NFT_ID1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "NFT_ID2",
            type: "uint256",
          },
          {
            internalType: "uint256[4]",
            name: "_nums",
            type: "uint256[4]",
          },
          {
            internalType: "uint8",
            name: "body",
            type: "uint8",
          },
        ],
        name: "fusion",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_tokenURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "NFTid1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "NFTid2",
            type: "uint256",
          },
          {
            internalType: "uint256[3]",
            name: "_gene",
            type: "uint256[3]",
          },
          {
            internalType: "uint256[4]",
            name: "_accessory",
            type: "uint256[4]",
          },
        ],
        name: "fusionJavs",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[15]",
            name: "_nums",
            type: "uint256[15]",
          },
        ],
        name: "gacha",
        outputs: [
          {
            internalType: "uint256[3]",
            name: "",
            type: "uint256[3]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[4]",
            name: "_nums",
            type: "uint256[4]",
          },
        ],
        name: "getAcce",
        outputs: [
          {
            internalType: "uint256[4]",
            name: "",
            type: "uint256[4]",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getJavsAccessory",
        outputs: [
          {
            internalType: "uint256[4]",
            name: "",
            type: "uint256[4]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getJavsCreate_at",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getJavsGene",
        outputs: [
          {
            internalType: "uint256[3]",
            name: "",
            type: "uint256[3]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getSaleData",
        outputs: [
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_tokenURI",
            type: "string",
          },
          {
            internalType: "uint256[3]",
            name: "_gene",
            type: "uint256[3]",
          },
          {
            internalType: "uint256[4]",
            name: "_accessory",
            type: "uint256[4]",
          },
        ],
        name: "pickup",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        name: "pushSaleData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as AbiItem[],
    SALE_FACTORY_ABI: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "purchasePrice",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currencyAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftAddress",
            type: "address",
          },
        ],
        name: "createSale",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_NFTcreatorAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_saleContract",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_workId",
            type: "uint256",
          },
        ],
        name: "NewSale",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "admin",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "allSales",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getSaleContractAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "NFTcreatorContract",
        outputs: [
          {
            internalType: "contract JAV_NFT",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "sales",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as AbiItem[],
    SALE_ABI: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_admin",
            type: "address",
          },
          {
            internalType: "address",
            name: "_seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_purchasePrice",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_currencyAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "_nftAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Cancel",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "SaleEnded",
        type: "event",
      },
      {
        inputs: [],
        name: "JavTokenContract",
        outputs: [
          {
            internalType: "contract JavToken",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "NFTcreatorContract",
        outputs: [
          {
            internalType: "contract JAV_NFT",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "buyer",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "cancelSales",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "currencyAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "ended",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getSaleInfo",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "nftAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "purchase_amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
        ],
        name: "purchase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "purchasePrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "seller",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as AbiItem[],
    TOKEN_ABI: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimal",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "JAV_NFT_address",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "createNFT",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "purchaseNFT",
        type: "event",
      },
      {
        inputs: [],
        name: "JAV_NFT_Contract",
        outputs: [
          {
            internalType: "contract JAV_NFT",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_tokenURI",
            type: "string",
          },
          {
            internalType: "uint256[3]",
            name: "_gene",
            type: "uint256[3]",
          },
          {
            internalType: "uint256[4]",
            name: "_accessory",
            type: "uint256[4]",
          },
        ],
        name: "JavPickup",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256",
          },
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "saleAddress",
            type: "address",
          },
        ],
        name: "purchase",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as AbiItem[],
  },

  CONTRACT_ADDRESS: {
    NFT_ADDRESS: "0x71Df61797BD670261b8750fBFA831F80406134ae",
    SALE_FACTORY_ADDRESS: "0x913348B095a3f2E5E621B057d80fCa0b581b7460",
    TOKEN_ADDRESS: "0xFBec88eA0D09D4Eb0766A53AC6B35F0746C11e39",
  },
};
// 랜덤
function randomNums(n: Number) {
  const value = [];
  for (let i = 0; i < n; i++) {
    value.push(Math.floor(Math.random() * 100));
  }
  return value;
}
// export default ABI;
export const web3 = new Web3(window.ethereum);
export const JAV_NFT_Contract = new web3.eth.Contract(
  ABI.CONTRACT_ABI.NFT_ABI,
  ABI.CONTRACT_ADDRESS.NFT_ADDRESS
);
export const JavToken_Contract = new web3.eth.Contract(
  ABI.CONTRACT_ABI.TOKEN_ABI,
  ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS
);
export const SaleFactory_Contract = new web3.eth.Contract(
  ABI.CONTRACT_ABI.SALE_FACTORY_ABI,
  ABI.CONTRACT_ADDRESS.SALE_FACTORY_ADDRESS
);

export const getWalletAddress = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const address = accounts[0];
  return address;
};

export const CreateSale_Contract = (saleAddress: string) => {
  const SaleContract = new web3.eth.Contract(
    ABI.CONTRACT_ABI.SALE_ABI,
    saleAddress
  );
  return SaleContract;
};

// 10000 Jav 토큰 발행
export const CreateJavToken = async (address: string) => {
  await JavToken_Contract.methods.mint(10000).send({ from: address });
};

export const BalanceOfJavToken = async (userAddress: string) => {
  const balance = await JavToken_Contract.methods
    .balanceOf(userAddress) // <- 얘는 사용자 지갑 주소 받아와서 할당해야함
    .call();

  return balance;
};

export const randomGene = () => {
  const genes = JAV_NFT_Contract.methods.gacha(randomNums(15)).call();
  return genes;
};

export const randomAcce = () => {
  const acces = JAV_NFT_Contract.methods.getAcce(randomNums(4)).call();
  return acces;
};

export const PickUp = async (
  address: string,
  imageURI: string,
  genes: number[],
  acces: number[]
) => {
  const value = await JavToken_Contract.methods
    .JavPickup(
      imageURI,
      [BigInt(genes[0]), BigInt(genes[1]), BigInt(genes[2])],
      [Number(acces[0]), Number(acces[1]), Number(acces[2]), Number(acces[3])]
    )
    .send({ from: address });
  return value.events.createNFT[1].returnValues._tokenId;
};

export const getFusionGene = async (NFTID_1: Number, NFTID_2: Number) => {
  const body0 = await JAV_NFT_Contract.methods
    .fusion(NFTID_1, NFTID_2, randomNums(4), 0)
    .call();

  const body1 = await JAV_NFT_Contract.methods
    .fusion(NFTID_1, NFTID_2, randomNums(4), 1)
    .call();

  const body2 = await JAV_NFT_Contract.methods
    .fusion(NFTID_1, NFTID_2, randomNums(4), 2)
    .call();

  return [body0, body1, body2];
};

export const FusionJavs = async (
  address: string,
  NFTID_1: Number,
  NFTID_2: Number,
  imageURI: string,
  genes: string[],
  acces: string[]
) => {
  const result = await JAV_NFT_Contract.methods
    .fusionJavs(
      imageURI,
      NFTID_1,
      NFTID_2,
      [BigInt(genes[0]), BigInt(genes[1]), BigInt(genes[2])],
      [Number(acces[0]), Number(acces[1]), Number(acces[2]), Number(acces[3])]
    )
    .send({ from: address });

  const tokenId = result.events.createNFT.returnValues._tokenId;
  return tokenId;
};

export const CreateSale = async (
  address: string,
  tokenId: Number,
  price: Number
) => {
  // await JAV_NFT_Contract.methods.setApprovalForAll(ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS, true).send({from : address});

  const SaleContractAddress = await SaleFactory_Contract.methods
    .createSale(
      tokenId,
      price,
      ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS,
      ABI.CONTRACT_ADDRESS.NFT_ADDRESS
    )
    .send({ from: address });

  const saleAddress = SaleContractAddress.events.NewSale.returnValues[0];
  return saleAddress;
};

export const Purchase = async (address: string, saleAddress: string) => {
  const value = await JavToken_Contract.methods
    .purchase(saleAddress)
    .send({ from: address });
  const tokenId = value.events.purchaseNFT.returnValues._tokenId;
  return tokenId;
};

export const CancelSale = async (saleAddress: string) => {
  const address = getWalletAddress();
  const Sale_Contract = new web3.eth.Contract(
    ABI.CONTRACT_ABI.SALE_ABI,
    saleAddress
  );

  const bool = await Sale_Contract.methods
    .cancelSales()
    .send({ from: address });
  return bool;
};

export const SetApproveAll = async (myAddress: string) => {
  const value: boolean = await JAV_NFT_Contract.methods
    .setApprovalForAll(ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS, true)
    .send({ from: myAddress });
  return value;
};

export const GetSaleData = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.getSaleData(tokenId).call();
  return data;
};

// NFT 데이터 조회
export const GetJavsGene = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.getJavsGene(tokenId).call();
  return data;
};

export const GetJavsAccessory = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.getJavsAccessory(tokenId).call();
  return data;
};

export const GetJavsCreate_at = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.getJavsCreate_at(tokenId).call();
  return data;
};

export const GetJavsOwner = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.ownerOf(tokenId).call();
  return data;
};

export const GetJavsURI = async (tokenId: number) => {
  const data = await JAV_NFT_Contract.methods.tokenURI(tokenId).call();
  return data;
};

// 판매 권한 등록 확인
export const IsApproved = async (user_address: string) => {
  const data = await JAV_NFT_Contract.methods
    .isApprovedForAll(user_address, ABI.CONTRACT_ADDRESS.TOKEN_ADDRESS)
    .call();
  return data;
};

// Sale data 확인
// export const SaleTokenId = async (saleAddress:string) => {
//   const Sale_Contract = new web3.eth.Contract(ABI.CONTRACT_ABI.SALE_ABI,saleAddress);
//   const data = await Sale_Contract.methods.tokenId().call()
//   return data
// }

// 테스트중
// let EventTest = JAV_NFT_Contract.events.createNFT
