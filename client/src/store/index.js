export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
