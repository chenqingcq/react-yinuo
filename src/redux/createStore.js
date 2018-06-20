import reducers from './reducer';

export const createStore = (state, reducers) => {
  console.log(state,reducers)
  const listeners = [];
  let state = state || {};
  const subscribe = (listen) => listeners.push(listen);
  const dispatch = (action) => {
    const newStore = reducers(state, action);
    listeners.forEach(item => {
      item(newStore, state);
    })
    state = newStore;
  };
  return {
    state,
    dispatch,
    subscribe
  }
}