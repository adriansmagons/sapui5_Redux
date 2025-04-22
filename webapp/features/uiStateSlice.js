sap.ui.define([], function() {
    
    function uiStateReducer (state = {}, action) {
            switch (action.type) {
                case "NAVIGATE_TO":{

                    return{
                        ...state,
                        activeRoute: action.payload.sTargetRoute
                    }
                }
                default: 
                    return state
            }
        }

        return uiStateReducer

});