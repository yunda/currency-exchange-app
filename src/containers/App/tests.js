import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

test('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    
    expect(wrapper).toHaveLength(1);
});
