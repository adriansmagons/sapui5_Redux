sap.ui.define(["sap/ui/base/Object",
], function(BaseObject, Redux, athleteSlice) {

    return BaseObject.extend("ui5.fitnessApp.commonActions", {
        
        sortTable: function ({sOrder, sAttribute, sEntityName}) {
            return {
                type: 'SORT_TABLE',
                payload: {
                    sOrder: sOrder,
                    sAttribute: sAttribute,
                    sEntityName: sEntityName
                }
            }
        },
        navigateTo: function ({sView, sOldView, sTargetRoute, sRouteParameters = {}, nAthleteId}) {
            return{
                type: 'NAVIGATE_TO',
                payload: {
                    sOldView: sOldView,
                    sView: sView,
                    sTargetRoute: sTargetRoute,
                    sRouteParameters: sRouteParameters,
                    nAthleteId: nAthleteId
                }
            }
        },
        refreshTable: function ({sOrder, sAttribute, sEntityName}) {
            return {
                type: 'REFRESH_TABLE',
                payload: {
                    sOrder: sOrder,
                    sAttribute: sAttribute,
                    sEntityName: sEntityName
                }
            }
        },
        searchBySurname: function({sQuery, sAttribute, sEntityName}){
            return {
                type: 'SEARCH_BY',
                payload: {
                    sAttribute: sAttribute,
                    sQuery: sQuery,
                    sEntityName: sEntityName
                }
            }
        },
        loadData: function({oData, sEntityName}){
             return {
                type: 'LOAD_DATA',
                payload: {
                    oData: oData,
                    sEntityName: sEntityName
                }
            }
        },
        insertAthlete: function({oAthlete}){
             return {
                type: 'INSERT_ATHLETE',
                payload: {
                    oAthlete: oAthlete
                }
            }
        },
        deleteAthlete: function({sAthleteId}){
             return {
                type: 'DELETE_ATHLETE',
                payload: {
                    sAthleteId: sAthleteId
                }
            }
        },
    })
 });