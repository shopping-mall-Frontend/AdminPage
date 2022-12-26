import React, { useState } from 'react';
import styled from 'styled-components';
import { getProductDetail } from '../../utils/useAPI';
import { ProductDetail } from './ProductDetail';
import { ProductForm } from './ProductForm';

const ProductItem = React.memo(
  ({ item, deleteItem, productList, setProductList }) => {
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
          <ItemHeaderDiv>
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
            <button
              onClick={() => {
                editProductHandler();
              }}
            >
              {editToggle ? '닫기' : '수정하기'}
            </button>
          </ItemHeaderDiv>
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
              <ItemInfoDiv>
                <span>{item.tags[0]}</span>
                <span>{item.title}</span>
                <span>{item.price.toLocaleString()}원</span>
              </ItemInfoDiv>
              {item.thumbnail ? (
                <ItemImgDiv>
                  <img alt="상품 이미지" src={item.thumbnail} />
                </ItemImgDiv>
              ) : (
                ''
              )}
            </>
          )}
        </ProductLi>
        {toggle ? (
          <ProductDetail item={product} toggle={toggle} setToggle={setToggle} />
        ) : (
          ''
        )}
      </>
    );
  }
);

const ProductLi = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
  margin: 20px;
  padding: 25px;
  width: 40vw;
`;

const ItemImgDiv = styled.div`
  display: flex;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    display: block;
    padding: 5px;
  }
`;

const ItemHeaderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
export { ProductItem };
