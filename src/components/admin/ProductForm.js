import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Title } from '../../pages';
import { addProduct, editProduct } from '../../utils/useAPI';

const tagValues = {
  brand: ['GUCCI', 'BOTTEGA VENETA', 'LOUIS VUITTON', 'CHANEL'],
  type: ['가방', '의류'],
};

const ProductForm = React.memo(({ list, setProductList, productList, editToggle, setEditToggle, setFormToggle }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (list) {
      setValue('title', list.title);
      setValue('price', list.price);
      setValue('description', list.description);
      setValue('brand', list.tags[0]);
      setValue('type', list.tags[1]);
      setValue('thumbnailBase64', list.thumbnail);
      setValue('photoBase64', list.photo);
    }
  }, []);

  const imgToBase64 = async (files) => {
    if (!files) return '';
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    } else {
      return '';
    }
  };

  const onSubmit = async (data) => {
    data.thumbnailBase64 = await imgToBase64(data.thumbnailBase64);
    data.photoBase64 = await imgToBase64(data.photoBase64);
    data.tags = [];

    data.tags.push(data['brand']);
    data.tags.push(data['type']);
    delete data['brand'];
    delete data['type'];
    let newData;
    if (editToggle) {
      newData = await editProduct(true, list.id, data);
      const editList = productList.filter((item) => item.id !== list.id);
      editList.push(newData);
      setProductList(editList);
      setEditToggle(false);
    } else {
      newData = await addProduct(true, data);
      setProductList([...productList, newData]);
      setFormToggle(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="제품 이름 (필수!)" {...register('title', { required: true })} />
        <input placeholder="제품 가격 (필수!)" {...register('price', { required: true })} />
        <textarea placeholder="제품 상세 설명 (필수!)" {...register('description', { required: true })}></textarea>
        {editToggle ? (
          <div>
            <label htmlFor="soldout">매진 처리하기</label>
            <input id="soldout" type="checkbox" {...register('isSoldOut', { required: false })} />
          </div>
        ) : (
          ''
        )}
        <Title>브랜드</Title>
        <select {...register('brand')}>
          {tagValues.brand.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <Title>카테고리</Title>
        <select {...register('type')}>
          {tagValues.type.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        {/* 제품 썸네일 사진 */}
        <input type="file" {...register('thumbnailBase64', { required: false })} />
        {/* 제품 상세 사진 */}
        <input type="file" {...register('photoBase64', { required: false })} />
        <button type="submit">완료</button>
      </Form>
    </>
  );
});

const Form = styled.form`
  background-color: white;

  input {
    display: block;
  }
`;

export { ProductForm };
