sap.ui.define([], function() {
    
    return {
        selectActiveRoute: function(state){
            return state.uiState.activeRoute
        },
        selectRouteParameters: function(state){
            return state.uiState.routeParameters
        },
    }

});