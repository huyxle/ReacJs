import {take, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    setCartItems
} from './../actions';

export function* fetchCartSaga() {
    const { user } = yield take(SET_CURRENT_USER);
    const response = yield fetch(`http://localhost:8081/cart/${user.id}`);
    const { items } = yield response.json();
    yield put(setCartItems(items));
    console.info("Set cart items", items)
} 