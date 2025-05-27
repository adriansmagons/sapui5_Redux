sap.ui.define(["sap/ui/core/mvc/Controller", 'sap/m/MessageToast', "ui5/fitnessApp/actions/startPageActions", "ui5/fitnessApp/actions/commonActions", "ui5/fitnessApp/selectors/commonSelectors", "ui5/fitnessApp/features/entitySlice", "sap/m/table/columnmenu/Menu", "sap/m/table/columnmenu/QuickSort", "sap/m/table/columnmenu/QuickSortItem", "sap/m/Menu", "sap/m/MenuItem", "sap/m/Column", "sap/m/Text"], (Controller, MessageToast, startPageActions, commonActions, commonSelectors, entitySlice, ColumnMenu, QuickSort, QuickSortItem, Menu, MenuItem, Column, Text) => {
  "use strict";

  return Controller.extend("ui5.fitnessApp.controller.Startpage", {
    onInit: function () {
      this.oStartPageActions = new startPageActions();
      this.oCommonActions = new commonActions();
      this.createSurnameSort();
    },
    createSurnameSort: function () {
      const oTable = this.getView().byId("players_table");
      const aColumns = oTable.getColumns();
      const oSurnameColumn = aColumns[1];
      oSurnameColumn.setHeaderMenu(new ColumnMenu({
        quickActions: [new QuickSort({
          items: new QuickSortItem({
            key: "Surname",
            label: "Surname"
          }),
          change: this.onSort.bind(this)
        })]
      }));
    },
    onAthletePress: function (oEvent) {
      document.activeElement.blur();
      let oContext = oEvent.getSource().getBindingContext("athleteModel");
      let nAthleteId = oContext.getProperty("_id");
      let sTargetRoute = "athleteDetails";
      let sRouteParameters = {
        athletePath: window.encodeURIComponent(oContext.getPath().substring(1))
      };
      const sCurrentView = this.oView.sViewName.split('.').at(-1);
      const oNavigateAction = this.oCommonActions.navigateTo({
        sView: "AthleteDetails",
        sOldView: sCurrentView,
        sTargetRoute: sTargetRoute,
        sRouteParameters: sRouteParameters,
        nAthleteId: nAthleteId
      });
      this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);
    },
    onSelectTab: function (oEvent) {
      let sTargetRoute = "home";
      const sKey = oEvent.getParameter("key");
      switch (sKey) {
        case "Startpage":
          sTargetRoute = "home";
          break;
        case "Profile":
          sTargetRoute = "profile";
          break;
      }
      const sCurrentView = this.oView.sViewName.split('.').at(-1);
      const oNavigateAction = this.oCommonActions.navigateTo({
        sView: sKey,
        sOldView: sCurrentView,
        sTargetRoute: sTargetRoute,
        nAthleteId: null
      });
      this.getOwnerComponent().reduxStore.dispatch(oNavigateAction);
    },
    onSort: function (oEvent) {
      let sSortOrder = oEvent.getParameter("item").getSortOrder();
      if (sSortOrder === "Ascending") {
        sSortOrder = "ASC";
      } else if (sSortOrder === "Descending") {
        sSortOrder = "DESC";
      } else {
        sSortOrder = "";
      }
      const oSortTableAction = this.oCommonActions.sortTable({
        sOrder: sSortOrder,
        sAttribute: ["surname"],
        sEntityName: "athletes"
      });
      this.getOwnerComponent().reduxStore.dispatch(oSortTableAction);
    },
    onSearch: function (oEvent) {
      let sQuery = oEvent.getSource().getValue();
      const oSearchAction = this.oCommonActions.searchBySurname({
        sQuery: sQuery,
        sAttribute: ["surname"],
        sEntityName: "athletes"
      });
      this.getOwnerComponent().reduxStore.dispatch(oSearchAction);
    },
    onRefresh: function () {
      const oRefreshAction = this.oCommonActions.refreshTable({
        sOrder: "",
        sAttribute: [""],
        sEntityName: "athletes"
      });
      this.getOwnerComponent().reduxStore.dispatch(oRefreshAction);
    },
    onOpenInsertDialog: function () {
      this.getView().byId("idInsertDialog").open();
    },
    onCloseInsertDialog: function (oEvent) {
      oEvent.getSource().getParent().close();
    },
    onInsertRow: function (oEvent) {
      const sNewId = commonSelectors.selectUniqueAthleteId(this.getOwnerComponent().reduxStore.getState()); // selects unique id from athlete list
      const oAthlete = {
        _id: sNewId,
        name: this.getView().byId("nameInput").getValue(),
        surname: this.getView().byId("surnameInput").getValue(),
        position: this.getView().byId("positionInput").getValue(),
        age: this.getView().byId("ageInput").getValue(),
        gender: this.getView().byId("genderInput").getValue()
      };
      const oInsertAthleteAction = this.oCommonActions.insertAthlete({
        oAthlete: oAthlete
      });
      this.getOwnerComponent().reduxStore.dispatch(oInsertAthleteAction);
      this.getView().byId("nameInput").setValue(""), this.getView().byId("surnameInput").setValue(""), this.getView().byId("positionInput").setValue(""), this.getView().byId("ageInput").setValue(""), this.getView().byId("genderInput").setValue("");
      oEvent.getSource().getParent().close();
    },
    toggleDeleteRow: function (oEvent) {
      const oTable = this.getView().byId("players_table");
      if (oEvent.getSource().getPressed()) {
        this.oSelectColumn = new Column({
          header: new Text({
            text: "Select"
          })
        });
        oTable.addColumn(this.oSelectColumn);
      } else {
        oTable.removeColumn(oTable.getColumns().length - 1);
      }
    },
    onDeleteRow: function (oEvent) {
      let oContext = oEvent.getSource().getBindingContext("athleteModel");
      let sAthleteId = oContext.getProperty("_id");
      const oDeleteAthleteAction = this.oCommonActions.deleteAthlete({
        sAthleteId: sAthleteId
      });
      this.getOwnerComponent().reduxStore.dispatch(oDeleteAthleteAction);
    },
    onFetchFromServer: function (oEvent) {
      MessageToast.show("Fetching data");
      this.getOwnerComponent().reduxStore.dispatch(entitySlice.fetchAthletes);
    }
  });
});
//# sourceMappingURL=Startpage-dbg.controller.js.map
