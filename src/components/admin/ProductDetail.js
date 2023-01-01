import React from 'react';
import styled from 'styled-components';

const ProductDetail = ({ item, setToggle, toggle }) => {
  return (
    <ModalDiv>
      <ProductUl>
        <CloseDiv>
          <button
            onClick={() => {
              setToggle(false);
            }}
          >
            닫기
          </button>
        </CloseDiv>{' '}
        <TextLi>
          <span>상품: {item.title}</span>
          <span>가격: {item.price}</span>
          <span>상품명: {item.description}</span>
          <span>브랜드: {item.tags[0]}</span>
          <span>카테고리: {item.tags[1]}</span>
          <span>매진 여부: {item.isSoldOut ? 'O' : 'X'}</span>
        </TextLi>
        {item.thumbnail ? (
          <ImgLi>
            <img alt="상품 이미지" src={item.thumbnail} />
          </ImgLi>
        ) : (
          ''
        )}
        {item.photo ? (
          <ImgLi>
            <img alt="상품 상세 이미지" src={item.photo} />
          </ImgLi>
        ) : (
          ''
        )}
      </ProductUl>
    </ModalDiv>
  );
};

const ProductUl = styled.ul`
  width: 80%;
  height: 80%;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 0 auto;
  padding: 25px;
  overflow: scroll;
`;

const ImgLi = styled.li`
  display: block;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CloseDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TextLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;
export { ProductDetail };
