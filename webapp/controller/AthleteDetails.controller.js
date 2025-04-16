sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "ui5/fitnessApp/actions/startPageActions",
], (Controller, startPageActions) => {
	"use strict";

	return Controller.extend("ui5.fitnessApp.controller.AthleteDetails", {

        onInit: function () {
            this.oStartPageActions = new startPageActions();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("athleteDetails").attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").athletePath),
                model: "athleteModel",
                events : {
                    dataRequested: function () {
                        that.getView().setBusy(true);
                },
                    dataReceived: function () {
                        that.getView().setBusy(false);
                    }
                }
            })
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