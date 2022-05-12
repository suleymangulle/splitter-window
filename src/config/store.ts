import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const defaultMiddlewares = [
  thunkMiddleware,
  promiseMiddleware,
];
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...defaultMiddlewares)
);
// const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = () => {
  const store = createStore(persistedReducer, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
};
export default store;
