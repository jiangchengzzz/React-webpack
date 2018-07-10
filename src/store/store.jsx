import {createStore,combineReducers,applyMiddleware} from 'redux';
import RootReducer from './reducer.jsx';//引入reduce
import ReduxThunk from 'redux-thunk';//中间件

var store = createStore(    //自动生成store的函数
    RootReducer, //reduce,修改state状态的函数集合
    applyMiddleware(ReduxThunk) //中间件
);

export default store;