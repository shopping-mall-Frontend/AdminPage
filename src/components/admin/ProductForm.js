import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Title } from '../../pages';

const Form = styled.form`
  input {
    display: block;
  }
`;

const tagValues = {
  brand: ['GUCCI', 'BOTTEGA VENETA', 'LOUIS VUITTON', 'CHANEL'],
  type: ['가방', '의류'],
};

const ProductForm = React.memo(({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="제품 이름 (필수!)"
        {...register('title', { required: true })}
      />
      <input
        placeholder="제품 가격 (필수!)"
        {...register('price', { required: true })}
      />
      <textarea
        placeholder="제품 상세 설명 (필수!)"
        {...register('description', { required: true })}
      ></textarea>
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
      <input
        type="file"
        {...register('thumbnailBase64', { required: false })}
      />
      {/* 제품 상세 사진 */}
      <input type="file" {...register('photoBase64', { required: false })} />
      <button type="submit">완료</button>
    </Form>
  );
});

export { ProductForm };
