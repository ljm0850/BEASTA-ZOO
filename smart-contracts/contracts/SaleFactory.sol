// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./JavToken.sol";
import "./JAV_NFT.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {

    address public admin; // 관리자, 계약 배포자
    address[] public sales; // 판매자
    mapping(uint256=>address) saleContractAddress;  // 토큰id -> Salecontract address 맵핑
    JAV_NFT public NFTcreatorContract;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor(address _NFTcreatorAddress) {
        admin = msg.sender;
        NFTcreatorContract = JAV_NFT(_NFTcreatorAddress);
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    // 판매 등록
    function createSale(
        uint256 itemId, // 아마 NFT_ID
        // uint256 minPrice,   //최저가(우린 필요 없을듯)
        uint256 purchasePrice,  //즉구가
        // uint256 startTime,  // 판매 시작 시간
        // uint256 endTime,    // 판매 끝나는 시간
        address currencyAddress,    //ERC-20 주소
        address nftAddress  // NFT 계약 주소
    ) public returns (address) {
        // TODO
        address seller = msg.sender;    //해당 컨트랙트 호출자가 판매자
        Sale instance = new Sale(admin, seller, itemId, purchasePrice, currencyAddress, nftAddress);
        // 생성한 인스턴스에게 tokenid에 해당하는 토큰의 소유권 넘겨주기
        // NFTcreatorContract.saleApprovalForAll(seller);
        NFTcreatorContract.approve(address(instance), itemId);
        NFTcreatorContract.transferFrom(seller, address(instance), itemId);
        // return instance;
        // emit NewSale(_saleContract, _owner, _workId);
        sales.push(address(instance));
        saleContractAddress[itemId] = address(instance);
        emit NewSale(address(instance), msg.sender, itemId);
        return address(instance);
    }

    //생성된 모든 Sale 주소 반환
    function allSales() public view returns (address[] memory) {
        return sales;
    }

    function getSaleContractAddress(uint256 tokenId) public view returns (address) {
        require(saleContractAddress[tokenId] != address(0), "this token is not on sale.");
        return saleContractAddress[tokenId];
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
 /**
각 거래를 위한 스마트 컨트랙트
생성자(constructor), 제안하기(bid), 즉시구매(purchase), 구매완료(confirmItem), 판매취소(cancel)을 포함
구매하고자 하는경우 구매희망자는 bid(), purchase()를 호출
판매기한이 끝나면 최고가를 제안한 주소는 confirmItem()을 호출하여 판매자에게 ERC-20을 전송하고 NFT소유권을 자신의 것으로 변경한다.
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;  // 판매자
    address public buyer;   // 구매자
    address admin;  // 관리자
    // uint256 public saleStartTime;   //판매 시작 시간
    // uint256 public saleEndTime;     // 판매 종료 시간
    // uint256 public minPrice;    // 최저가(우린 필요 없을듯)
    uint256 public purchasePrice;   // 즉구가
    uint256 public tokenId; // 거래할 NFT tokenId
    address public currencyAddress; // 거래시 사용할 ERC-20(JavToken)의 주소
    address public nftAddress;  // nft creator 주소(NFT 계약 주소)
    bool public ended;  // 판매 종료 여부

    event Cancel(
        uint256 tokenId
    );
    // 현재 최고 입찰 상태
    // address public highestBidder;   // 필요 없을듯
    // uint256 public highestBid;  // 필요 없을듯

    // IERC20 public erc20Contract; // 임시 
    // IERC721 public erc721Constract; // 임시
    JavToken public JavTokenContract;
    JAV_NFT public NFTcreatorContract;

    // event HighestBidIncereased(address bidder, uint256 amount); // 경매 상위 입찰시 인거 같은데 우린 필요 없을듯
    event SaleEnded(address winner, uint256 amount);    // 최종 구매자 정보(판매 종료시, 구매자, 가격 event 발생)
    // 최초 배포시 관리자, 구매자, 판매자 등 기록
    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        // uint256 _minPrice,
        uint256 _purchasePrice,
        // uint256 startTime,
        // uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        // require(_minPrice > 0);
        require(_purchasePrice > 0); // 정말 필요한지 나중에 다시 확인해보자
        tokenId = _tokenId;
        // minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        // saleStartTime = startTime;
        // saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        JavTokenContract = JavToken(_currencyAddress);
        NFTcreatorContract = JAV_NFT(_nftAddress);     // SSFTokenContract = SSFToken(_currencyAddress);
    }
    // 경매에서 가격 제시
    // function bid(uint256 bid_amount) public {
    //     // TODO
    // }
    // 즉구가 구매
    // 받는 인자로 address buyer 해두셨는데, buyer = msg.sender입니다.
    function purchase(uint256 purchase_amount) public {
        // TODO 
        require(msg.sender != seller, "seller can't call this function");
        // require(block.timestamp < saleEndTime, "Sale time has expired");
        require(JavTokenContract.balanceOf(msg.sender) >= purchase_amount, "buyer do not have enough ERC20 token");
        require(JavTokenContract.allowance(msg.sender, address(this)) != 0, "buyer did not approve this contract");
        require(JavTokenContract.allowance(msg.sender, address(this)) >= purchase_amount, "caller approve less amount of token");
        require(purchase_amount == purchasePrice, "Wrong price");
        buyer = msg.sender;
        JavTokenContract.transferFrom(buyer, seller, purchase_amount);
        NFTcreatorContract.transferFrom(address(this), buyer, tokenId);
        emit SaleEnded(buyer, purchase_amount);
        _end();
    }
    // 경매에서 최고 입찰자에게 파는 함수
    // function confirmItem() public {
    //     // TODO 
    // }
    // 판매 철회 함수
    function cancelSales() public {
        // TODO
        // require(block.timestamp < saleEndTime, "Sale time has expired");
        require(msg.sender == seller || msg.sender == admin, "caller is not approved");
        // NFT 소유권을 판매자에게 되돌려주기
        NFTcreatorContract.transferFrom(address(this), seller, tokenId);
        _end();
        emit Cancel(tokenId);
    }
    // 판매 종료 남은 시간
    // function getTimeLeft() public view returns (int256) {
    //     return (int256)(saleEndTime - block.timestamp);
    // }
    // 판매 정보
    function getSaleInfo()
        public
        view
        returns (
            // uint256,
            // uint256,
            // uint256,
            uint256,
            uint256,
            // address,
            // uint256,
            address,
            address
        )
    {
        return (
            // saleStartTime,
            // saleEndTime,
            // minPrice,
            purchasePrice,
            tokenId,
            // highestBidder,
            // highestBid,
            currencyAddress,
            nftAddress
        );
    }
    // 경매에서 최고 입찰가 얼마인지 조회
    // function getHighestBid() public view returns(uint256){
    //     return highestBid;
    // }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    // 판매 종료
    function _end() internal {
        ended = true;
    }
    // 잔액 조회
    function _getCurrencyAmount() private view returns (uint256) {
        return JavTokenContract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.
    // modifier = > 함수에 추가하여 조건 확인하는데 사용됨 function x() public onlySeller returns(bool){}이런 형식
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
    // 
    // modifier onlyAfterStart() {
    //     require(
    //         block.timestamp >= saleStartTime,
    //         "Sale: This sale is not started."
    //     );
    //     _;
    // }
}
