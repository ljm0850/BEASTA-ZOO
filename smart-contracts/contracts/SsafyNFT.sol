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
        uint256[3] gene;
        uint8[5] accessory; 
        uint256 create_at;
    }

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;
    mapping(uint256 => javsDetail) javsData;
    event createNFT (uint256 indexed _tokenId, address indexed _owner);

    // 각종 조회 함수들
    
    // 지워버린 토큰까지 포함됨
    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }
    
    function getJavsData(uint256 tokenId) public view returns (javsDetail memory) {
        return javsData[tokenId];
    }

    // 뽑기,조합 관련 함수들
    
    // NFT 생성
    function create(address to, string memory _tokenURI, uint256[3] memory _gene, uint8[5] memory _accessory) internal returns (uint256) {
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

    function randomGene() pure internal returns (uint256){
        // 랜덤
        return 1;
    }
    function makeGene(uint256 _gene1, uint256 _gene2) pure internal returns (uint256){
        // 특별한 알고리즘 필요
        uint256 new_gene = _gene1 + _gene2;
        return new_gene;
    }
    function randomAccessory() pure internal returns (uint8){
        // 랜덤
        return 1;
    }
    // 뽑기
    function pickup(string memory _tokenURI) public returns (uint256) {
        // 돈 관련 체크 필요
        uint256[3] memory _gene = [randomGene(),randomGene(),randomGene()];
        uint8[5] memory _accessory = [randomAccessory(),randomAccessory(),randomAccessory(),randomAccessory(),randomAccessory()];
        uint256 value = create(msg.sender,_tokenURI,_gene,_accessory);
        return value;
    }

    // 조합
    function fusionJavs(string memory _tokenURI, uint256 NFTid1, uint256 NFTid2) public returns (uint256){
        // 돈 관련 체크 필요
        // burn된 token의 경우 ERC721에서 ownerOf 하면서 처리해줌
        require(msg.sender == ownerOf(NFTid1), "you are not NFT owner");
        require(msg.sender == ownerOf(NFTid2), "you are not NFT owner");
        uint256[3] memory NFT1_gene = getJavsData(NFTid1).gene;
        uint256[3] memory NFT2_gene = getJavsData(NFTid2).gene;
        uint256[3] memory new_gene = [makeGene(NFT1_gene[0],NFT2_gene[0]),makeGene(NFT1_gene[1],NFT2_gene[1]),makeGene(NFT1_gene[2],NFT2_gene[2])];
        uint8[5] memory _accessory = [randomAccessory(),randomAccessory(),randomAccessory(),randomAccessory(),randomAccessory()];
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
