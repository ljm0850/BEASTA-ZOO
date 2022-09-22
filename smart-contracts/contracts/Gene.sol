// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract gene{

    uint[7] weight = [1, 1, 1, 1, 6, 6, 24];
    uint[3] fusionWeight = [2, 2, 1];
    uint[3] colorWeight = [1, 1, 1];
    uint[3] gachaWeight = [1, 1, 1];

    function gacha() public view returns (uint) {

        uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;
        uint random2 = uint(keccak256(abi.encodePacked(random))) % 100;
        uint random3 = uint(keccak256(abi.encodePacked(random2))) % 100;
        uint random4 = uint(keccak256(abi.encodePacked(random3))) % 100;
        uint random5 = uint(keccak256(abi.encodePacked(random4))) % 100;

        uint color = _colorPicker(random);
        uint self = _gacha(random2);
        uint mother = _gacha(random3);
        uint fatherMother = _gacha(random4);
        uint motherMother = _gacha(random5);
        
        uint myGene = color * (16 ** 21)
        + self * (16 ** 18)
        + self * (16 ** 15)
        + mother * (16 ** 12)
        + self * (16 ** 9)
        + fatherMother * (16 ** 6)
        + mother * (16 ** 3)
        + motherMother * (16 ** 0);

        return myGene;
    }

    function fusion(uint _geneX, uint _geneY) public view returns (uint) {
        uint[7] memory arrayX;
        uint[7] memory arrayY;
        uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;
        uint random2 = uint(keccak256(abi.encodePacked(random))) % 100;
        uint random3 = uint(keccak256(abi.encodePacked(random2))) % 100;
        uint random4 = uint(keccak256(abi.encodePacked(random3))) % 100;

        for (uint i = 1; i < weight.length + 1; i++) {
            arrayX[i-1] = _geneX % (16 ** ((i * 3) - (i - 1) * 3));
            arrayY[i-1] = _geneY % (16 ** ((i * 3) - (i - 1) * 3));
        }

        uint winX = _winner(arrayX, random);
        uint winY = _winner(arrayY, random2);

        uint winZ = _fusion(winX, winY, random3);
        uint color = _colorPicker(random4);
        
        uint childTemp = color * (16 ** 21)
        + winZ * (16 ** 18)
        + arrayX[6] * (16 ** 15)
        + arrayY[6] * (16 ** 12);

        uint child = childTemp
        + arrayX[5] * (16 ** 9)
        + arrayX[4] * (16 ** 6)
        + arrayY[5] * (16 ** 3)
        + arrayY[4] * (16 ** 0);
        
        return child;
    }

    function getAcce1() public view returns (uint) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;

      for (uint i = 1; i < 17; i++) {
          if (random < i * 100 / 16) {
            uint acce = 16 ** 2 + i;
            return acce;
          }
      }
    }

    function getAcce2() public view returns (uint) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;

      for (uint i = 1; i < 13; i++) {
          if (random < i * 100 / 12) {
            uint acce = 2 * (16 ** 2) + i;
            return acce;
          }
      }
    }

    function getAcce3() public view returns (uint) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;

      for (uint i = 1; i < 14; i++) {
          if (random < i * 100 / 13) {
            uint acce = 3 * (16 ** 2) + i;
            return acce;
          }
      }
    }

    function getAcce4() public view returns (uint) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;

      for (uint i = 1; i < 13; i++) {
          if (random < i * 100 / 12) {
            uint acce = 4 * (16 ** 2) + i;
            return acce;
          }
      }
    }

    function _winner(uint[7] memory _array, uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 7; i++) {
            weightSum += weight[i];

            if (_random < weightSum * 100 / 40) {
                return _array[i];
            }
        }
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
    }

    function _colorPicker(uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 3; i++) {
            weightSum += colorWeight[i];

            if (_random < weightSum * 100 / 3) {
                return i + 1;
            }
        }
    }

    function _gacha(uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 3; i++) {
            weightSum += gachaWeight[i];

            if (_random < weightSum * 100 / 3) {
                return i + 1;
            }
        }
    }
}