export const uiStateReducer = function (state = {}, action) {
            switch (action.type) {
                case "NAVIGATE_TO":{
                    return{
                        ...state,
                        activeRoute: action.payload.sTargetRoute,
                        activeView: action.payload.sView,
                        routeParameters: action.payload.sRouteParameters
                    }
                }
                default: 
                    return state
            }
        }