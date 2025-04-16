sap.ui.define([], function() {
    
    function uiStateReducer (state = {a: "something"}, action) {
            switch (action.type) {
                case "NAVIGATE_TO":{

                    return{
                        ...state,
                        [action.payload.oldView]: {
                            visible: false
                        },
                        [action.payload.view]: {
                            visible: true
                        }
                    }
                }
                default: 
                    return state
            }
        }

        return uiStateReducer

});