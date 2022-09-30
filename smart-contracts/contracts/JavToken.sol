// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/ERC20/ERC20.sol";
import "./access/Ownable.sol";
import "./JAV_NFT.sol";
import "./SaleFactory.sol";
/**
 MetaMask에 SSAFY Network 연결 후 Remix통해 JavToken.sol 배포
 그 후 Metamask에 스마트 컨트랙트 주소 통해 Jav토큰 불러옴
 */ 
contract JavToken is ERC20, Ownable{
    JAV_NFT public JAV_NFT_Contract;
    event createNFT (uint256 indexed _tokenId, address indexed _owner);
    event purchaseNFT (uint256 _tokenId);
    // mapping(address => uint256) private JavToken;
    constructor(string memory name, string memory symbol, uint8 decimal, address JAV_NFT_address) ERC20(name, symbol, decimal) {
        JAV_NFT_Contract = JAV_NFT(JAV_NFT_address);
    }
    
    function mint(uint256 amount) public {
        _mint(_msgSender(),amount);
    }
    
    // function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
    //     _transfer(from, to, amount);
    // }

    function JavPickup(string memory _tokenURI, uint[3] memory _gene, uint[4] memory _accessory) public returns(uint) {
        super.transfer(address(JAV_NFT_Contract),100);
        uint tokenId = JAV_NFT_Contract.pickup(_tokenURI, _gene, _accessory);
        JAV_NFT_Contract.transferFrom(address(this),msg.sender,tokenId);
        emit createNFT(tokenId, msg.sender);
        return tokenId;
    }

    // function sendMoney(address seller, uint pay) internal {
    //     // require(_balances[msg.sender] >= pay,"show me the money");
    //     _balances[msg.sender] -= pay;
    //     _balances[seller] += pay;
    // }
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        super.transfer(recipient,amount);
        return true;
    }

    function purchase(address saleAddress) public returns(uint){
        Sale SaleContract = Sale(saleAddress);
        uint price = SaleContract.purchasePrice();
        uint tokenId = SaleContract.tokenId();
        address seller = SaleContract.seller();
        transfer(seller,price);
        JAV_NFT_Contract.transferFrom(seller,msg.sender,tokenId);
        JAV_NFT_Contract.pushSaleData(tokenId,price);
        SaleContract.purchase(price,msg.sender);
        emit purchaseNFT(tokenId);
        return tokenId;
    }
}