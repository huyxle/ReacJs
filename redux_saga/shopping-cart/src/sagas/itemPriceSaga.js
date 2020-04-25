import { take, all, fork, put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    SET_CURRENT_USER,
    SET_ITEM_DETAILS,
    setCartItems,
    setItemPrice
} from './../actions';

export function* fetchItemPrice(id, currency) {
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    const price = json[0].price;
    yield put(setItemPrice(id, price));
}

export function* itemPriceSaga() {
    const [{user}, {items}] = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS)
    ]);

    console.info("item price saga")

    //yield items.map(item=>call(fetchItemPrice, item.id, user.country));

    for(var i = 0; i < items.length; i++) {
        yield call(fetchItemPrice, items[i].id, user.country)
    }
}