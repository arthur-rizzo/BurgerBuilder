import React from 'react';
import Logo from '../../Logo/Logo';
import Items from '../Items/Items';
import classes from './Sidedrawer.css';

const sidedrawer = (props) => {
    
    return (
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}><Logo/></div>
            <nav><Items></Items></nav>
        </div>
    );
}
 
export default sidedrawer;