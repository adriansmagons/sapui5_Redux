sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "ui5/fitnessApp/actions/startPageActions",
 ], (Controller, JSONModel, startPageActions) => {
    "use strict";
 
    return Controller.extend("ui5.fitnessApp.controller.Profile", {
        onInit: function () {
            this.oStartPageActions = new startPageActions();
        },

        onSelectTab: function(oEvent){
            let sTargetRoute = "home";
            const sKey = oEvent.getParameter("key");

            switch(sKey){
                case "Startpage":
                    sTargetRoute = "home";
                    break;
                case "Profile":
                    sTargetRoute = "profile";
                    break;
            }

            const sCurrentView = this.oView.sViewName.split('.').at(-1)
            const oNavigateAction = this.oStartPageActions.navigateTo({sView: sKey, sOldView: sCurrentView, sTargetRoute: sTargetRoute});
            this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);

            
        },
    });
 });