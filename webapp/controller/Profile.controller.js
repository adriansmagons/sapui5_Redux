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
            const oRouter = this.getOwnerComponent().getRouter();
            const sKey = oEvent.getParameter("key");

            const sCurrentView = this.oView.sViewName.split('.').at(-1)
            const oNavigateAction = this.oStartPageActions.navigateTo({sView: sKey, sOldView: sCurrentView});
            this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);

            switch(sKey){
                case "Startpage":
                    oRouter.navTo("home");
                    break;
                case "Profile":
                    oRouter.navTo("profile");
                    break;
            }
        },
    });
 });