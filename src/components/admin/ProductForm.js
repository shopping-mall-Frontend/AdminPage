import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Form = styled.form`
  input {
    display: block;
  }
`;

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
      <input placeholder="태그" {...register('tags', { required: false })} />
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
