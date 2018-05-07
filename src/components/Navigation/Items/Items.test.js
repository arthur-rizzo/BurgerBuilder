import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Items from './Items';
import Item from './Item';

configure({adapter: new Adapter()});

describe('<Items/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Items/>);
    });

    it('should render 2 <Item/> elements if not authenticated', () => {
        expect(wrapper.find(Item)).toHaveLength(2);
    });

    it('should render 3 <Item/> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(Item)).toHaveLength(3);
    });

    it('should render <item>logout</item> if authenticated', () => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toBeTruthy();
    });
});