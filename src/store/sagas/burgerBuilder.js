import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

export function* initIngredientsSaga() {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}