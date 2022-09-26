// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/ERC20/ERC20.sol";
import "./access/Ownable.sol";

/**
 MetaMask에 SSAFY Network 연결 후 Remix통해 JavToken.sol 배포
 그 후 Metamask에 스마트 컨트랙트 주소 통해 Jav토큰 불러옴
 */ 
contract JavToken is ERC20, Ownable{
    
    constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol, decimal) {}
    
    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }
    
    function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
        _transfer(from, to, amount);
    }
}