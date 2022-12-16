import React from 'react';

const ProductItem = ({ item }) => {
  return (
    <li>
      <span>제품 이름: {item.title}</span>
      <span>제품 가격: {item.price}</span>
      <span>제품 상세 설명: {item.description}</span>
      <span>제품 태그: {item.tags}</span>
      {item.thumbnail ? (
        <span>
          제품 썸네일: <img alt="상품 이미지" src={item.thumbnail} />
        </span>
      ) : (
        ''
      )}
      {item.photo ? (
        <span>
          제품 상세 이미지:
          <img alt="상품 상세 이미지" src={item.photo} />
        </span>
      ) : (
        ''
      )}
      <span>매진 여부: {item.isSoldOut ? 'O' : 'X'}</span>
    </li>
  );
};

export { ProductItem };
