sap.ui.define(["sap/ui/base/Object",
], function(BaseObject, Redux, athleteSlice) {

    return BaseObject.extend("ui5.fitnessApp.commonActions", {
        
        sortTable: function ({sOrder, sSortBy, sTableId, sView}) {
            return {
                type: 'SORT_TABLE',
                payload: {
                    sOrder: sOrder,
                    sSortBy: sSortBy,
                    sTableId: sTableId,
                    sView: sView
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
        searchBySurname: function({sQuery, sSearchBy, sView}){
            return {
                type: 'SEARCH_BY',
                payload: {
                    sSearchBy: sSearchBy,
                    sQuery: sQuery,
                    sView: sView
                }
            }
        }
    })
 });