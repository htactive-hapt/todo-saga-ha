import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchTodos() {
    return axios({
        method: 'GET',
        url: 'https://5f194821e104860016bae927.mockapi.io/todo-ha/'
    });
}

function deleteTodo(id) {
    return axios({
        method: 'DELETE',
        url: `https://5f194821e104860016bae927.mockapi.io/todo-ha/${id}`
    })
}
// function addTodo(taskName, createdAt) {
//     return axios({
//         method: 'POST',
//         url: 'https://5f194821e104860016bae927.mockapi.io/todo-ha/'
//     });
// }

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        const response = yield call(fetchTodos);
        const data = response.data;

        // dispatch a success action to the store with the new todo
        yield put({ type: 'API_CALL_SUCCESS', data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: 'API_CALL_FAILURE', error });
    }
}