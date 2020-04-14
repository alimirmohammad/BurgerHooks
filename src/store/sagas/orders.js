import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

    try {
        const res = yield axios.get('/orders.json' + queryParams);
        const fetchedData = [];
        for (let key in res.data) {
            fetchedData.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedData));
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}