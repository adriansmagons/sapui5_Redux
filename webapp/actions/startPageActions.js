sap.ui.define(["sap/ui/base/Object",
], function(BaseObject, Redux, athleteSlice) {

    return BaseObject.extend("ui5.fitnessApp.startPageActions", {
        
        sortTable: function ({sOrder}) {
            return {
                type: 'SORT_TABLE',
                payload: {
                    order: sOrder
                }
            }
        },
        navigateTo: function ({sView, sOldView, sTargetRoute}) {
            return{
                type: 'NAVIGATE_TO',
                payload: {
                    oldView: sOldView + "View",
                    view: sView + "View",
                    sTargetRoute: sTargetRoute
                }
            }
        },
    })
 });