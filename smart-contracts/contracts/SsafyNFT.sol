// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {
    constructor() ERC721("javjongNFT","JNFT"){
    }
    // 저장된 데이터들
    struct javsDetail {
        uint80 gene;
        uint24 accessory; 
        uint256 create_at;
    }

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;
    mapping(uint256 => javsDetail) javsData;
    event createNFT (uint256 indexed _tokenId, address indexed _owner);

    // 각종 조회 함수들
    // 현재까지 생성된 NFT 수 ,지워버린 토큰까지 포함
    function current() public view returns (uint256) {
        return _tokenIds;
    }
    // 토큰안에 들어있는 URL 조회
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }
    // 유전정보 조회
    function getJavsGene(uint256 tokenId) public view returns (uint80) {
        // 여기서 암호화 하면되긴 하는데, 단순 수학 계산을 이용하여 암호화 해야 할듯?
        return javsData[tokenId].gene;
    }

    function getJavsAccessory(uint256 tokenId) public view returns (uint24) {
        return javsData[tokenId].accessory;
    }

    function getJavsCreate_at(uint256 tokenId) public view returns (uint256) {
        return javsData[tokenId].create_at;
    }
    // 뽑기,조합 관련 함수들
    
    // NFT 생성
    function create(address to, string memory _tokenURI, uint80 _gene, uint24 _accessory) internal returns (uint256) {
        uint256 tokenId = current() + 1;
        tokenURIs[tokenId] = _tokenURI;
        _tokenIds = tokenId;
        _mint(to, tokenId);
        // 데이터 조회를 위해 추가
        javsData[tokenId].gene =  _gene;
        javsData[tokenId].accessory = _accessory;
        javsData[tokenId].create_at = block.timestamp;
        emit createNFT(tokenId, to);
        return tokenId;
    }
    // 알고리즘

    function randomGene() pure internal returns (uint80){
        // 랜덤
        return 1111111111111111111111;
    }
    function makeGene(uint80 _gene1, uint80 _gene2) pure internal returns (uint80){
        // 특별한 알고리즘 필요
        uint80 new_gene = _gene1 + _gene2;
        return new_gene;
    }
    function randomAccessory() pure internal returns (uint24){
        // 랜덤
        return 11111;
    }
    // 뽑기
    function pickup(string memory _tokenURI) public returns (uint256) {
        // 돈 관련 체크 필요 혹은 public을 external로 변경하여 다른 계약에서 호출, 호출시 this.pickup()형태
        uint80 _gene = randomGene();
        uint24 _accessory = randomAccessory();
        uint256 value = create(msg.sender,_tokenURI,_gene,_accessory);
        return value;
    }

    // 조합
    function fusionJavs(string memory _tokenURI, uint256 NFTid1, uint256 NFTid2) public returns (uint256){
        // 돈 관련 체크 필요 혹은 public을 external로 변경
        // burn된 token의 경우 ERC721에서 ownerOf 하면서 처리해줌
        require(msg.sender == ownerOf(NFTid1), "you are not NFT owner");
        require(msg.sender == ownerOf(NFTid2), "you are not NFT owner");
        uint80 NFT1_gene = javsData[NFTid1].gene;
        uint80 NFT2_gene = javsData[NFTid2].gene;
        uint80 new_gene = makeGene(NFT1_gene,NFT2_gene);
        uint24 _accessory = randomAccessory();
        _burn(NFTid1);
        _burn(NFTid2);
        uint256 value = create(msg.sender,_tokenURI,new_gene,_accessory);
        return value;
    }
    
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
        delete javsData[tokenId];
        delete tokenURIs[tokenId];
    }
}
