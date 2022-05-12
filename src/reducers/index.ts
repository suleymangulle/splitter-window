import { combineReducers } from 'redux';
import splitterReducer from './splitter-reducer';

const appReducer = combineReducers({
    splitterReducer,
});

const RootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export default RootReducer;
