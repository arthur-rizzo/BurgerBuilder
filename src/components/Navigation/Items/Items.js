import React from 'react';
import classes from './Items.css';
import Item from './Item';

const items = () => (
    <ul className={classes.Items}>
        <Item link="/" active>BurgerBuilder</Item>
        <Item link="/">Checkout</Item>
    </ul>
);
 
export default items;