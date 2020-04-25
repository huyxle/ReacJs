import { take, put, fork,call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import {
    SET_CART_ITEMS,
    setItemDetails
} from './../actions';

export function* loadItemDetails(item) {
    console.info("item", item);
    const response = yield fetch(`http://localhost:8081/items/${item.id}`);
    const data = yield response.json();
    yield put(setItemDetails(data[0]));
}

export function* itemDetailsSaga() {
    const { items } = yield take(SET_CART_ITEMS);
    // yield items.map(item=>fork(loadItemDetails, item));
    for(var i = 0; i< items.length; i++) {
        yield fork(loadItemDetails, items[i]);
    }
}