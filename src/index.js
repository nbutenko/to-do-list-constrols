import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "redux";

const reducers = (state, action) => {
    console.log(action);
    if(action.type === "ADD_NEW_TASK") {
        const taskList = [...state.taskList, {id: Math.random(), name: action.payload, done: false}];
        return {...state, taskList};
    }

    if(action.type === "DELETE_TASK") {
        const taskList = state.taskList.filter((el, index) => index !== action.payload);
        return{...state, taskList}
    }

    if(action.type === "TASK_SET_STATUS") {
        const taskList = state.taskList.map(el => el.id === action.payload.taskId ? {...el, done: action.payload.status} : el)
        return{...state, taskList}
    }

    if(action.type === "GET_TASK_LIST") {
        return state.taskList;
    }

    return {taskList: []};
}

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);
