export const uiReducer = function (state = {}, action) {
            switch (action.type) {
                case "NAVIGATE_TO":{
                    return{
                        ...state,
                        activeRoute: action.payload.sTargetRoute,
                        activeView: action.payload.sView,
                        routeParameters: action.payload.sRouteParameters,
                        currentAthlete: action.payload.nAthleteId
                    }
                }
                case "LOADING":{
                    return{
                        ...state,
                        appLoading: action.payload.bLoading
                    }
                }
                default: 
                    return state
            }
        }