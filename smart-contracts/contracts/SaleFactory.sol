// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin; // 관리자
    address[] public sales; // 판매자

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    // 판매 등록
    function createSale(
        uint256 itemId, // 아마 NFT_ID
        uint256 minPrice,   //최저가(우린 필요 없을듯)
        uint256 purchasePrice,  //즉구가
        uint256 startTime,  // 판매 시작 시간
        uint256 endTime,    // 판매 끝나는 시간
        address currencyAddress,    //ERC-20 주소
        address nftAddress  // NFT 계약 주소
    ) public returns (address) {
        // TODO
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;  // 판매자
    address public buyer;   // 구매자
    address admin;  // 관리자
    uint256 public saleStartTime;   //판매 시작 시간
    uint256 public saleEndTime;     // 판매 종료 시간
    uint256 public minPrice;    // 최저가(우린 필요 없을듯)
    uint256 public purchasePrice;   // 즉구가
    uint256 public tokenId; // NFT ID
    address public currencyAddress; // ERC-20주소
    address public nftAddress;  // NFT 계약 주소ㅓ
    bool public ended;  // 판매 종료 여부

    // 현재 최고 입찰 상태
    address public highestBidder;   // 필요 없을듯
    uint256 public highestBid;  // 필요 없을듯

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event HighestBidIncereased(address bidder, uint256 amount); // 경매 상위 입찰시 인거 같은데 우린 필요 없을듯
    event SaleEnded(address winner, uint256 amount);    // 판매 종료, 구매자, 가격
    // 최초 배포시 관리자, 구매자, 판매자 등 기록
    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        saleStartTime = startTime;
        saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);   // 문법을 잘 모르겠따 NFTcreatorContract = JAVcreator(_nftAddress);
        erc721Constract = IERC721(_nftAddress);     // SSFTokenContract = SSFToken(_currencyAddress);
    }
    // 경매에서 가격 제시
    function bid(uint256 bid_amount) public {
        // TODO
    }
    // 즉구가 구매
    function purchase() public {
        // TODO 
    }
    // 경매에서 최고 입찰자에게 파는 함수
    function confirmItem() public {
        // TODO 
    }
    // 판매 철회 함수
    function cancelSales() public {
        // TODO
    }
    // 판매 종료 남은 시간
    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }
    // 판매 정보
    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }
    // 경매에서 최고 입찰가 얼마인지 조회
    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    // 판매 종료
    function _end() internal {
        ended = true;
    }
    // 
    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(
            block.timestamp >= saleStartTime,
            "Sale: This sale is not started."
        );
        _;
    }
}
