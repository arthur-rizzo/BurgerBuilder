import React from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

const layout = (props) => (
    <React.Fragment>
        <Toolbar></Toolbar>
        <Sidedrawer></Sidedrawer>
        <main className={classes.Content}>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;
