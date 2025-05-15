sap.ui.define([
    "sap/ui/base/Object",
    "reselect",
    "ui5/fitnessApp/selectors/commonSelectors",
    "ui5/fitnessApp/selectors/appStateSelectors",
], function(BaseObject, Reselect, commonSelectors, appStateSelectors) {
    return BaseObject.extend("ui5.fitnessApp.selectors.athleteSelectors", {

    constructor: function () {
        this.commonSelectors = new commonSelectors();
        this.appStateSelectors = new appStateSelectors();
        this.selectVisibleAthletes = this.createSelectVisibleAthletes();
    },

    // selectVisibleAthletes: Reselect.createSelector([this.appStateSelectors.selectTable], (oVisibleAthletes) =>{   // Returns athletes with sorting and filtering
    //     return oVisibleAthletes
    // }),

    //  selectVisibleAthletes: Reselect.createSelector([this.appStateSelectors.selectTable], (oVisibleAthletes) =>{   // Returns athletes with sorting and filtering
    //     return oVisibleAthletes
    // }),

    createSelectVisibleAthletes: function(){
        return Reselect.createSelector([this.appStateSelectors.selectTable], (oVisibleAthletes) =>{   // Returns athletes with sorting and filtering
            return oVisibleAthletes
            })
    },

    selectAthletes: function (state){
        return state.athletes
    }




   })

});