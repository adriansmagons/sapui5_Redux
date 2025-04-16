sap.ui.define(["redux",
                "ui5/fitnessApp/features/athleteSlice",
                "ui5/fitnessApp/features/appStateSlice",
                "ui5/fitnessApp/features/uiStateSlice",
], function(Redux, athleteSlice, appStateSlice, uiStateSlice) {
        return Redux.combineReducers({
            athletes: athleteSlice,
            appState: appStateSlice,
            uiState:  uiStateSlice
        })
       
 });