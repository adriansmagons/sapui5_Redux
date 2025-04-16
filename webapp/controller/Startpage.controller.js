
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    'sap/m/MessageToast',
    "ui5/fitnessApp/actions/startPageActions",
    "sap/m/table/columnmenu/MenuBase",
    "sap/m/table/columnmenu/Menu",
    "sap/m/table/columnmenu/QuickSort",
    "sap/m/table/columnmenu/QuickSortItem",
    "sap/m/Menu",
    "sap/m/MenuItem",
 ], (Controller, JSONModel, Sorter, Filter, FilterOperator, FilterType,MessageToast, startPageActions, MenuBase, ColumnMenu, QuickSort, QuickSortItem, Menu, MenuItem) => {
    "use strict";
 
    return Controller.extend("ui5.fitnessApp.controller.Startpage", {
    
        onInit: function () {
            this.oStartPageActions = new startPageActions();
            this.createSurnameSort();
        },

        onAthletePress: function (oEvent) {
            const sCurrentView = this.oView.sViewName.split('.').at(-1)
            const oNavigateAction = this.oStartPageActions.navigateTo({sView: "AthleteDetails", sOldView: sCurrentView});
            this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);

            document.activeElement.blur();

            let oContext = oEvent.getSource().getBindingContext("athleteModel");
            let sAthleteId = oContext.getProperty("_id");
            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("athleteDetails", {
                athletePath: window.encodeURIComponent(oContext.getPath().substring(1))
            });
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
        createSurnameSort: function(){
            const oTable = this.getView().byId("players_table");
			const aColumns = oTable.getColumns();
            const oSurnameColumn = aColumns[1];

            oSurnameColumn.setHeaderMenu(new ColumnMenu({
				quickActions: [
					new QuickSort({
						items: new QuickSortItem({
							key: "Surname",
							label: "Surname"
						}),
						change: function(oEvent) {
							const oBinding = oTable.getBinding("items");
							const sSortOrder = oEvent.getParameter("item").getSortOrder();
							if (sSortOrder === "Ascending") {
								oBinding.sort([new Sorter("surname", false)]);
								oSurnameColumn.setSortIndicator("Ascending");
							} else if (sSortOrder === "Descending") {
								oBinding.sort([new Sorter("surname", true)]);
								oSurnameColumn.setSortIndicator("Descending");
							} else {
								oSurnameColumn.setSortIndicator("None");
							}
						}
					})
				]
			}));

        },
        onSearch: function(oEvent){
            var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("surname", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("players_table");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
        },
        onRefresh: function(){
            const oTable = this.getView().byId("players_table");
            const oBinding = oTable.getBinding("items");
            oBinding.sort(null);
        },
    });
 });