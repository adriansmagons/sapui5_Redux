sap.ui.define([
    "sap/ui/base/Object",
    "reselect",
     "ui5/fitnessApp/selectors/athleteSelectors",
], function(BaseObject, Reselect, sd) {
    return BaseObject.extend("ui5.fitnessApp.selectors.uiStateSelectors", {

    constructor: function () {
    },


    selectActiveView: function(oState) {
        return oState.uiState.activeView
    },

    selectActiveRoute: function(oState) {
        return oState.uiState.activeRoute
    },
    selectRouteParameters: function(oState) {
        return oState.uiState.routeParameters
    },


    //   selectActiveRoute: function(state){
//             return state.uiState.activeRoute
//         },
//         selectRouteParameters: function(state){
//             return state.uiState.routeParameters
//         },

   })

});