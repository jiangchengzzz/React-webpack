import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const defaultState = {//设定state的默认值
   mainText:"mainContainer",
   topicText:"topicContainer"
};
const reducer = (state = defaultState, action) => {     
    switch (action.type) {//通过action的返回值来选择更新哪个state的状态
        case 'AlterMain':
            return  Object.assign({},state,{ mainText:action.payload});
        case 'AlterTopic':
            return  Object.assign({},state,{ topicText:action.payload});
        default:
            return state;
    }
};
const RootReducer = combineReducers({//可以定义多个reducer，然后通过combineReducers来合并
    routing:routerReducer,//redux和router处理函数
    app:reducer      //app 需要与组件里面上传的state一致
});


if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
export default RootReducer;