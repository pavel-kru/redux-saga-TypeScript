import React from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My first book',
    descrtiption: 'The first book I ever wrote',
  },
  {
    id: 'p2',
    price: 10,
    title: 'My second book',
    descrtiption: 'The second book I ever wrote',
  },
];

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(prod => (
          <ProductItem key={prod.id} id={prod.id} title={prod.title} price={prod.price} description={prod.descrtiption} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
