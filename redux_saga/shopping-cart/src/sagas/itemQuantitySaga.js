import { takeLatest, select, put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { 
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHED, FETCHING
} from './../actions';

import {
    currentUserSelector
} from '../selectors'

export function* handleIncreaseItemQuantity({id}) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`);

    if(response.status !== 200) {
        yield put(decreaseItemQuantity(id, true));
        alert("Sorry, there weren't enought items in stock to complete your request")
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({id, local}) {
    if(local) return;

    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`);

    if(response.status !== 200) {
        console.warn("Receive non-200 status");
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
    yield takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity)
    yield takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
    
}