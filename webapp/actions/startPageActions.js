sap.ui.define(["sap/ui/base/Object",
], function(BaseObject, Redux, athleteSlice) {

    return BaseObject.extend("ui5.fitnessApp.startPageActions", {
        
        sortTable: function ({sOrder, sSortBy, sTableId}) {
            return {
                type: 'SORT_TABLE',
                payload: {
                    sOrder: sOrder,
                    sSortBy: sSortBy,
                    sTableId: sTableId
                }
            }
        },
        navigateTo: function ({sView, sOldView, sTargetRoute, sRouteParameters = {}}) {
            return{
                type: 'NAVIGATE_TO',
                payload: {
                    sOldView: sOldView,
                    sView: sView,
                    sTargetRoute: sTargetRoute,
                    sRouteParameters: sRouteParameters
                }
            }
        },
        refreshTable: function ({sOrder, sSortBy}) {
            return {
                type: 'REFRESH_TABLE',
                payload: {
                    sOrder: sOrder,
                    sSortBy: sSortBy
                }
            }
        },
        searchBySurname: function({sQuery}){
            return {
                type: 'SEARCH_BY_SURNAME',
                payload: {
                    sQuery: sQuery
                }
            }
        }
    })
 });