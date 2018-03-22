import React from 'react';
import classes from './Item.css';

const item = (props) => (
    <li className={classes.Item}>
        <a 
            className={props.active ? classes.active : null }
            href={props.link}>{props.children}</a>
    </li>
);
 
export default item;