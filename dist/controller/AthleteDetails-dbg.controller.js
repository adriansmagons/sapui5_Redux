sap.ui.define(["sap/ui/core/mvc/Controller", "ui5/fitnessApp/actions/commonActions", "ui5/fitnessApp/actions/athleteDetailsActions", "sap/m/table/columnmenu/MenuBase", "sap/m/table/columnmenu/Menu", "sap/m/table/columnmenu/QuickSort", "sap/m/table/columnmenu/QuickSortItem"], (Controller, commonActions, athleteDetailsActions, MenuBase, ColumnMenu, QuickSort, QuickSortItem) => {
  "use strict";

  return Controller.extend("ui5.fitnessApp.controller.AthleteDetails", {
    onInit: function () {
      this.oAthleteDetailsActions = new athleteDetailsActions();
      this.oCommonActions = new commonActions();
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("athleteDetails").attachPatternMatched(this.onObjectMatched, this);
      this.createDateSort();
    },
    onObjectMatched: function (oEvent) {
      this.getView().bindElement({
        path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").athletePath),
        model: "athleteModel",
        events: {
          dataRequested: function () {
            that.getView().setBusy(true);
          },
          dataReceived: function () {
            that.getView().setBusy(false);
          }
        }
      });
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
    createDateSort: function () {
      const oTable = this.getView().byId("sessions_table");
      const aColumns = oTable.getColumns();
      const oDateColumn = aColumns[1];
      oDateColumn.setHeaderMenu(new ColumnMenu({
        quickActions: [new QuickSort({
          items: new QuickSortItem({
            key: "Date",
            label: "Date"
          }),
          change: this.onSort.bind(this)
        })]
      }));
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
        sAttribute: ["date"],
        sEntityName: "trainingSessions"
      });
      this.getOwnerComponent().reduxStore.dispatch(oSortTableAction);
    }
  });
});
//# sourceMappingURL=AthleteDetails-dbg.controller.js.map
