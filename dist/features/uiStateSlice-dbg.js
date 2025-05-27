sap.ui.define([], function () {
  "use strict";

  const uiStateReducer = function (state = {}, action) {
    switch (action.type) {
      case "NAVIGATE_TO":
        {
          return {
            ...state,
            activeRoute: action.payload.sTargetRoute,
            activeView: action.payload.sView,
            routeParameters: action.payload.sRouteParameters
          };
        }
      default:
        return state;
    }
  };
  var __exports = {
    __esModule: true
  };
  __exports.uiStateReducer = uiStateReducer;
  return __exports;
});
//# sourceMappingURL=uiStateSlice-dbg.js.map
