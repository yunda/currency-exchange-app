import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from '../../store/store';
import ExchangeForm from '../ExchangeForm';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ExchangeForm />
            </Provider>
        );
    }
}
