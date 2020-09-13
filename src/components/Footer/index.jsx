import React from 'react';
import { AiOutlineAmazon, AiTwotoneHeart } from 'react-icons/ai';
import './style.css';

const Footer = () => (
  <div className="amz-footer text-center mt-5">
    <AiOutlineAmazon className="h1" />
    <div>
      clone made with much
      {' '}
      <span className="text-danger"><AiTwotoneHeart /></span>
    </div>
  </div>
);

export default Footer;
