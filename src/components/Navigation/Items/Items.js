import React from 'react';
import classes from './Items.css';
import Item from './Item';

const items = (props) => (
    <ul className={classes.Items}>
        <Item link="/" exact>BurgerBuilder</Item>
        {props.isAuthenticated ? <Item link="/orders">Orders</Item> : null }
        {props.isAuthenticated ? <Item link="/logout">Logout</Item> : <Item link="/auth">Authenticate</Item>}
    </ul>
);
 
export default items;