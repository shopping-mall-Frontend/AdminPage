import React, { useState } from 'react';
import styled from 'styled-components';
import { getProductDetail } from '../../utils/useAPI';
import { ProductDetail } from './ProductDetail';
import { ProductForm } from './ProductForm';

const ProductItem = React.memo(({ item, deleteItem, productList, setProductList }) => {
  const [product, setProduct] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const getProductDetails = async (id) => {
    const newProduct = await getProductDetail(id);
    setProduct(newProduct);
  };

  const showProductDetail = async () => {
    await getProductDetails(item.id);
    setToggle(true);
  };

  const editProductHandler = async () => {
    if (product.length === 0) {
      await getProductDetails(item.id);
    }
    if (!editToggle) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  };
  return (
    <>
      <ProductLi key={item.id}>
        {editToggle ? (
          <ProductForm
            list={product}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
            productList={productList}
            setProductList={setProductList}
          />
        ) : (
          <>
            {item.thumbnail ? (
              <ItemImgDiv>
                <img alt="상품 이미지" src={item.thumbnail} />
              </ItemImgDiv>
            ) : (
              '이미지 없음'
            )}
            <div className="info-wrap">
              <p>[{item.tags[0]}]</p>
              <p className="title">{item.title}</p>
              <p>{item.price.toLocaleString()}$</p>
            </div>
          </>
        )}
        <ItemOptionDiv>
          <button
            onClick={() => {
              editProductHandler();
            }}
          >
            {editToggle ? '닫기' : '수정하기'}
          </button>
          <button
            onClick={() => {
              deleteItem(item.id);
            }}
          >
            삭제하기
          </button>
          <button
            onClick={() => {
              showProductDetail();
            }}
          >
            상세정보 보기
          </button>
        </ItemOptionDiv>
      </ProductLi>
      {toggle ? <ProductDetail item={product} toggle={toggle} setToggle={setToggle} /> : ''}
    </>
  );
});

const ProductLi = styled.li`
  width: calc(80% - 15px);
  position: relative;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ced4da;
  .info-wrap {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    p {
      padding: 10px;
      white-space: nowrap;
      display: block;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ItemImgDiv = styled.div`
  width: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemOptionDiv = styled.div`
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: #748ffc;
    }
  }
`;
export { ProductItem };
