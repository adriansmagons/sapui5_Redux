sap.ui.define(["ui5/fitnessApp/thirdparty/redux", "ui5/fitnessApp/features/entitySlice", "ui5/fitnessApp/features/appSlice", "ui5/fitnessApp/features/uiSlice"], function (Redux, entitySlice, appSlice, uiSlice) {
  return Redux.combineReducers({
    entities: entitySlice.entityReducer,
    app: appSlice.appReducer,
    ui: uiSlice.uiReducer
  });
});
