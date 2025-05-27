sap.ui.define(["sap/ui/base/Object", "ui5/fitnessApp/thirdparty/redux", "ui5/fitnessApp/thirdparty/redux-thunk", "ui5/fitnessApp/reducer"], function (BaseObject, Redux, thunk, rootReducer) {
  return BaseObject.extend("ui5.fitnessApp.store", {
    constructor: function (initialState) {
      this.store = Redux.createStore(rootReducer, initialState, Redux.compose(Redux.applyMiddleware(thunk.thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
    }
  });
});
