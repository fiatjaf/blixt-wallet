import { createStore, createTypedHooks, Store } from "easy-peasy";
import { composeWithDevTools } from "remote-redux-devtools";
import model, { IStoreModel } from "./index";

const { useStoreActions, useStoreState, useDispatch } = createTypedHooks<IStoreModel>();
export { useStoreActions, useDispatch, useStoreState };

let store: Store<IStoreModel>;
if (process.env.NODE_ENV === "development") {
  store = createStore(model, {
    compose: composeWithDevTools({
      realtime: true,
      trace: true,
      hostname: "192.168.1.100",
      port: 8000,
    })
  });
}
else {
  store = createStore(model);
}

export default store;