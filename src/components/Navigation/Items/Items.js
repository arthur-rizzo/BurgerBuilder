import React from 'react';
import classes from './Items.css';
import Item from './Item';

const items = () => (
    <ul className={classes.Items}>
        <Item link="/" exact>BurgerBuilder</Item>
        <Item link="/orders">Orders</Item>
    </ul>
);
 
export default items;