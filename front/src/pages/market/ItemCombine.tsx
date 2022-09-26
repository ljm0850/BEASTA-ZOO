const ItemCombine = () => {
  
  /**
    프로젝트 구현    
     * 1. 조합 승인 모달창에 개인키를 입력하면 getAddressFrom() 함수를 이용해 공개키를 반환 받습니다.
     * 2. 공개키가 유효한 경우 Combine Factory 컨트랙트의 Combination() 함수를 호출하여 새로운 Combine 컨트랙트를 생성합니다.
     * 3. 컨트랙트 정상 호출 후 새로운 Combine 컨트랙트의 주소를 반환 받습니다.
     * 4. 생성된 Conbine 컨트랙트가 판매자를 대신하여 NFT 소유권을 소각할 수 있도록 Combine에게 NFT를 전송합니다. (transferFrom())
     * 5. Combine 컨트랙트는 해당 NFT를 소각합니다.
     * 6. 소각과 함께 유전 알고리즘에 의해 새로운 형태의 이미지가 생성됩니다.
     * 7.  해당 NFT를 IPFS에 업로드합니다.
     * 8. 업로드 완료 후 얻은 정보롤 해당 NFT의 메타데이터(Metadata)를 구성하여 IPFS에 업로드합니다.
     * 9. 메타데이터 업로드 완료 후 얻은 정보를 tokenURI로 하여 NFT 생성을 위한 스마트 컨트랙트의 함수를 호출합니다.
     * 10. 정상적으로 트랜잭션이 완결된 후 token Id가 반환됩니다.
     * 11. 백엔드에 token Id와 owner_address를 포함한 정보를 등록 요청합니다.  
    */

  return <div></div>;
};

export default ItemCombine;
