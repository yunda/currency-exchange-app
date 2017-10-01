import React from 'react';
import {shallow} from 'enzyme';
import _ from 'lodash'
import {initialState} from '../../store/reducers';
import ExchangeForm from './index';

jest.mock('react-redux', () => ({
    connect: () => (obj) => obj
}));

afterAll(() => {
    jest.unmock('react-redux');
});

test('Renders without crashing', () => {
    const component = shallow(<ExchangeForm dispatch={_.noop} { ...initialState} />);
    
    expect(component).toHaveLength(1);
});
