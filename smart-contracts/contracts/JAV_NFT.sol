// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./JavToken.sol";
/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract JAV_NFT is ERC721 {
    constructor() ERC721("javjongNFT","JNFT"){
    }
    // import
    JavToken public JavTokenContract;

    // 저장된 데이터들
    struct javsDetail {
        uint[3] gene;     // [머리,귀,하관]
        uint[4] accessory; // [악세1,악세2,악세3,악세4]
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
    function getJavsGene(uint256 tokenId) public view returns (uint[3] memory) {
        // 여기서 암호화 하면되긴 하는데, 단순 수학 계산을 이용하여 암호화 해야 할듯?
        return javsData[tokenId].gene;
    }

    function getJavsAccessory(uint256 tokenId) public view returns (uint[4] memory) {
        return javsData[tokenId].accessory;
    }

    function getJavsCreate_at(uint256 tokenId) public view returns (uint256) {
        return javsData[tokenId].create_at;
    }
    
    // 뽑기,조합 관련 함수들
    
    // NFT 생성
    function create(address to, string memory _tokenURI, uint[3] memory _gene, uint[4] memory _accessory) internal returns (uint256) {
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

    function pickup(string memory _tokenURI, uint[3] memory _gene, uint[4] memory _accessory) public returns (uint256){
        // require(JavTokenContract.allowance(msg.sender, ) >= 100); //NFT를 발급하려는 JA
        // JavTokenContract.transferFrom(msg.sender, address(this), 100);
        uint256 value = create(msg.sender,_tokenURI,_gene,_accessory);

        return value;
    }

    // 조합
    function fusionJavs(string memory _tokenURI, uint256 NFTid1, uint256 NFTid2 ,uint[3] memory _gene, uint[4] memory _accessory ) public returns (uint256){
        // 돈 관련 체크 필요 혹은 public을 external로 변경
        // burn된 token의 경우 ERC721에서 ownerOf 하면서 처리해줌
        require(msg.sender == ownerOf(NFTid1), "you are not NFT owner");
        require(msg.sender == ownerOf(NFTid2), "you are not NFT owner");
        _burn(NFTid1);
        _burn(NFTid2);
        uint256 value = create(msg.sender,_tokenURI,_gene,_accessory);
        return value;
    }
    
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
        delete javsData[tokenId];
        delete tokenURIs[tokenId];
    }

    // 유전 알고리즘
    uint[7] weight = [1, 1, 1, 1, 6, 6, 24];
    uint[3] fusionWeight = [2, 2, 1];
    uint[3] colorWeight = [1, 1, 1];
    uint[3] gachaWeight = [1, 1, 1];
    uint temp;

    function gacha(uint[15] memory _nums) public view returns (uint[3] memory) {
        uint[3] memory color = [_colorPicker(_nums[0]),_colorPicker(_nums[1]),_colorPicker(_nums[2])];
        uint[3] memory self = [_gacha(_nums[3]),_gacha(_nums[4]),_gacha(_nums[5])];
        uint[3] memory mother = [_gacha(_nums[6]),_gacha(_nums[7]),_gacha(_nums[8])];
        uint[3] memory fatherMother = [_gacha(_nums[9]),_gacha(_nums[10]),_gacha(_nums[11])];
        uint[3] memory motherMother = [_gacha(_nums[12]),_gacha(_nums[13]),_gacha(_nums[14])];
        uint[3] memory myGene;


        for (uint i = 0; i<3; i++){
            myGene[i] = color[i] * 19342813113834066795298816
            + self[i] * 4722366482869645213696
            + self[i] * 1152921504606846976
            + mother[i] * 281474976710656
            + self[i] * 68719476736
            + fatherMother[i] * 16777216
            + mother[i] * 4096
            + motherMother[i];
        }
        return myGene;
    }
    
    function fusion(uint NFT_ID1, uint NFT_ID2, uint[4] memory _nums, uint8 body) public view returns (uint) {
        // body엔 파츠 번호 0,1,2 가 들어가야함
        uint _geneX = getJavsGene(NFT_ID1)[body];
        uint _geneY = getJavsGene(NFT_ID2)[body];
        uint[7] memory arrayX;
        uint[7] memory arrayY;
        for (uint i = 0; i < weight.length; i++) {
            arrayX[6-i] = _geneX % 4096;
            arrayY[6-i] = _geneY % 4096;
            _geneX /= 4096;
            _geneY /= 4096;
        }

        uint winX = _winner(arrayX, _nums[0]%100);
        uint winY = _winner(arrayY, _nums[1]%100); 

        uint winZ = _fusion(winX,winY,_nums[2]%100);
        uint color = _colorPicker(_nums[3]%100);
        
        uint child ;
        child = color * 19342813113834066795298816  // 16^21
            + winZ * 4722366482869645213696 // 16^18
            + arrayX[6] * 1152921504606846976 // 16^15
            + arrayY[6] * 281474976710656 //16^12
            + arrayX[5] * 68719476736 // 16^9
            + arrayX[4] * 16777216  // 16^6
            + arrayY[5] * 4096  // 16^3
            + arrayY[4];
        return child;
    }

    function getAcce(uint[4] memory _nums) public pure returns (uint[4] memory){
        uint[4] memory acce;
        acce[0] = 1*256 + _nums[0] % 16 +1;
        acce[1] = 2*256 + _nums[1] % 13 +1;
        acce[2] = 3*256 + _nums[2] % 14 +1;
        acce[3] = 4*256 + _nums[3] % 13 +1;
        return acce;
    }

    function _winner(uint[7] memory _array, uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 7; i++) {
            weightSum += weight[i];

            if (_random < weightSum * 5 / 2) {
                return _array[i];
            }
        }
        return 0;
    }

    function _fusion(uint x, uint y, uint _random) private view returns (uint) {
        if (x == 0x001) {
            if (y == 0x001) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x002) {
                uint[3] memory fusionArray = [x, y, 0x004];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x003) {
                uint[3] memory fusionArray = [x, y, 0x005];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x002) {
            if (y == 0x001) {
                uint[3] memory fusionArray = [x, y, 0x004];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x002) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x003) {
                uint[3] memory fusionArray = [x, y, 0x006];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x003) {
            if (y == 0x001) {
                uint[3] memory fusionArray = [x, y, 0x005];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x002) {
                uint[3] memory fusionArray = [x, y, 0x006];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x003) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x004) {
            if (y == 0x001 || y == 0x002 || y == 0x003) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x004) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x005) {
                uint[3] memory fusionArray = [x, y, 0x007];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x006) {
                uint[3] memory fusionArray = [x, y, 0x008];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x005) {
            if (y == 0x001 || y == 0x002 || y == 0x003) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x004) {
                uint[3] memory fusionArray = [x, y, 0x007];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x005) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x006) {
                uint[3] memory fusionArray = [x, y, 0x009];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x006) {
            if (y == 0x001 || y == 0x002 || y == 0x003) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x004) {
                uint[3] memory fusionArray = [x, y, 0x008];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x005) {
                uint[3] memory fusionArray = [x, y, 0x009];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x006) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else {
            uint[3] memory fusionArray = [y, y, x];
            uint res = _fusionWinner(fusionArray, _random);
            return res;
        }
    }

    function _fusionWinner(uint[3] memory _array, uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 3; i++) {
            weightSum += fusionWeight[i];

            if (_random < weightSum * 100 / 5) {
                return _array[i];
            }
        }
        return 0;
    }

    function _colorPicker(uint _random) private pure returns (uint) {
        return (_random % 3) +1;
    }

    function _gacha(uint _random) private pure returns (uint) {
        return _random %3 + 1;
    }
}
