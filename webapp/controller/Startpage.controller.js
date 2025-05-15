
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    'sap/m/MessageToast',
    "ui5/fitnessApp/actions/startPageActions",
    "ui5/fitnessApp/actions/commonActions",
    "sap/m/table/columnmenu/MenuBase",
    "sap/m/table/columnmenu/Menu",
    "sap/m/table/columnmenu/QuickSort",
    "sap/m/table/columnmenu/QuickSortItem",
    "sap/m/Menu",
    "sap/m/MenuItem",
 ], (Controller, JSONModel, Sorter, Filter, FilterOperator, FilterType,MessageToast, startPageActions, commonActions, MenuBase, ColumnMenu, QuickSort, QuickSortItem, Menu, MenuItem) => {
    "use strict";
 
    return Controller.extend("ui5.fitnessApp.controller.Startpage", {
    
        onInit: function () {
            this.oStartPageActions = new startPageActions();
            this.oCommonActions = new commonActions();
            this.createSurnameSort();
        },

        onAthletePress: function (oEvent) {  // FIX: implement redux, from other computer
            document.activeElement.blur();

            let oContext = oEvent.getSource().getBindingContext("athleteModel");
            let sAthleteId = oContext.getProperty("_id");  // Gets clicked athlete id
            let sTargetRoute = "athleteDetails";
            let sRouteParameters = {athletePath: window.encodeURIComponent(oContext.getPath().substring(1))};

            const sCurrentView = this.oView.sViewName.split('.').at(-1)
            const oNavigateAction = this.oCommonActions.navigateTo({sView: "AthleteDetails", sOldView: sCurrentView, sTargetRoute: sTargetRoute, sRouteParameters: sRouteParameters});
            this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);
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
            const oNavigateAction = this.oCommonActions.navigateTo({sView: sKey, sOldView: sCurrentView, sTargetRoute: sTargetRoute});
            this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);
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
                            // Dispatch action here
                            const sSortOrder = oEvent.getParameter("item").getSortOrder();
							const oSortTableAction = this.oCommonActions.sortTable({sOrder: sSortOrder, sSortBy: "surname", sTableId: "players_table", sView: "Startpage"});
                            this.getOwnerComponent().reduxStore.dispatch(oSortTableAction);
						}.bind(this)
					})
				]
			}));

        },
        onSearch: function(oEvent){
            let sQuery = oEvent.getSource().getValue();
            const oSearchAction = this.oCommonActions.searchBySurname({sQuery: sQuery, sSearchBy: "surname", sView: "Startpage"});
            this.getOwnerComponent().reduxStore.dispatch(oSearchAction);
        },
        
        onRefresh: function(){
            const oRefreshAction = this.oCommonActions.refreshTable({sOrder: null, sSortBy: ""});
            this.getOwnerComponent().reduxStore.dispatch(oRefreshAction);
        },
    });
 });