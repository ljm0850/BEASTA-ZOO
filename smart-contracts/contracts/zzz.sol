// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract gene{

    uint[7] weight = [1, 1, 1, 1, 6, 6, 24];
    uint[3] fusionWeight = [2, 2, 1];
    uint[3] colorWeight = [1, 1, 1];
    uint[3] gachaWeight = [1, 1, 1];


    function gacha(uint _num) public view returns (uint) {
        uint random1 = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;
        uint color = _colorPicker(random1+_num);
        uint self = _gacha(random1+_num);
        uint mother = _gacha(random1+_num);
        uint fatherMother = _gacha(random1+_num);
        uint motherMother = _gacha(random1+_num);
        
        uint myGene = color * 268435456
        + self * 16777216
        + self * 1048576
        + mother * 65536
        + self * 4096
        + fatherMother * 256
        + mother * 16
        + motherMother * 1;

        return myGene;
    }

    function fusion(uint _geneX, uint _geneY, uint _num) public view returns (uint) {
        uint random1 = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;
        uint[7] memory arrayX;
        uint[7] memory arrayY;
        uint mod = 16;
        for (uint i = 0; i < weight.length; i++) {
            arrayX[i] = (_geneX % mod)/(mod/16);
            arrayY[i] = (_geneY % mod)/(mod/16);
            mod *= 16;
        }

        uint winX = _winner(arrayX, random1);
        uint winY = _winner(arrayY, random1+_num);

        uint winZ = _fusion(winX, winY, random1+_num);
        uint color = _colorPicker(random1);
        
        uint childTemp = color * 268435456;
        childTemp+= winZ * 16777216;
        childTemp+ arrayX[6] * 1048576;
        childTemp+ arrayY[6] * 65536;
        childTemp+= arrayX[5] * 4096;
        childTemp+= arrayX[4] * 256;
        childTemp+= arrayY[5] * 16;
        childTemp+= arrayY[4] * 1;
        
        return childTemp;
    }
    function getAcc(uint _random, uint _num) private view returns (uint[4] memory) {
        uint[4] memory acc;
        acc[0] = _random % 16 + _num;
        acc[1] = _random % 12 + _num;
        acc[2] = _random % 13 + _num;
        acc[3] = _random % 12 + _num;
        return acc;
    }

    function _winner(uint[7] memory _array, uint _random) private view returns (uint) {
        uint weightSum;

        for (uint i = 0; i < 7; i++) {
            weightSum += weight[i];

            if (_random < weightSum * 5 / 2) {
                return _array[i];
            }
        }
    }

    function _fusion(uint x, uint y, uint _random) public view returns (uint) {
        if (x == 0x1) {
            if (y == 0x1) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x2) {
                uint[3] memory fusionArray = [x, y, 0x4];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x3) {
                uint[3] memory fusionArray = [x, y, 0x5];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x2) {
            if (y == 0x1) {
                uint[3] memory fusionArray = [x, y, 0x4];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x2) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x3) {
                uint[3] memory fusionArray = [x, y, 0x6];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x3) {
            if (y == 0x1) {
                uint[3] memory fusionArray = [x, y, 0x5];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x2) {
                uint[3] memory fusionArray = [x, y, 0x6];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x3) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x4) {
            if (y == 0x1 || y == 0x2 || y == 0x3) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x4) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x5) {
                uint[3] memory fusionArray = [x, y, 0x7];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x6) {
                uint[3] memory fusionArray = [x, y, 0x8];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x5) {
            if (y == 0x1 || y == 0x2 || y == 0x3) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x4) {
                uint[3] memory fusionArray = [x, y, 0x7];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x5) {
                uint[3] memory fusionArray = [x, y, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x6) {
                uint[3] memory fusionArray = [x, y, 0x9];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else {
                uint[3] memory fusionArray = [y, y, x];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            }
        } else if (x == 0x6) {
            if (y == 0x1 || y == 0x2 || y == 0x3) {
                uint[3] memory fusionArray = [x, x, y];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x4) {
                uint[3] memory fusionArray = [x, y, 0x8];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x5) {
                uint[3] memory fusionArray = [x, y, 0x9];
                uint res = _fusionWinner(fusionArray, _random);
                return res;
            } else if (y == 0x6) {
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

            if (_random < weightSum * 20) {
                return _array[i];
            }
        }
    }

    function _colorPicker(uint _random) private view returns (uint) {
        return _random % colorWeight.length + 1; // 어차피 확률 똑같잖아?
    }

    function _gacha(uint _random) private view returns (uint) {
        return _random % gachaWeight.length + 1; //어차피 뽑기에서 확률 똑같잖아
    }
}