import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import { render } from 'react-testing-library';
export * from 'react-testing-library';

export const simpleReducer = (state, action) => state;
export const loggingReducer = (state, action) => {
  console.log('action: ', action);
  return state;
};

export const renderWithRedux = reducer => (
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};
