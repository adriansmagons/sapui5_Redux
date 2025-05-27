sap.ui.define(['exports'], (function (exports) { 'use strict';

  // src/index.ts
  function createThunkMiddleware(extraArgument) {
    const middleware = ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
    return middleware;
  }
  var thunk = createThunkMiddleware();
  var withExtraArgument = createThunkMiddleware;

  const __esModule = true ;

  exports.__esModule = __esModule;
  exports.thunk = thunk;
  exports.withExtraArgument = withExtraArgument;

}));
