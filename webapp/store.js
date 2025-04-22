sap.ui.define(["sap/ui/base/Object",
                "redux",
                "ui5/fitnessApp/reducer",
], function(BaseObject, Redux, rootReducer) {

    return BaseObject.extend("ui5.fitnessApp.store", {
        constructor: function (initialState) {
            this.store = Redux.createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        }
    })
 });