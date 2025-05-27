sap.ui.define(["sap/ui/base/Object", "ui5/fitnessApp/thirdparty/reselect", "ui5/fitnessApp/selectors/commonSelectors"], function (BaseObject, Reselect, commonSelectors) {
  return BaseObject.extend("ui5.fitnessApp.selectors.appStateSelectors", {
    constructor: function () {
      this.commonSelectors = new commonSelectors();
      this.selectTable = this.createSelectTable();
    },
    createSelectTable: function () {
      return Reselect.createSelector([this.commonSelectors.selectAthletes, this.selectTableSorting.bind(this), this.selectTableFiltering.bind(this)], (oAthletes, oSortDetails, oFilterDetails) => {
        // Returns athletes with sorting and filtering
        if (oSortDetails.sortingOrder === "Ascending") {
          // Sorting table
          oAthletes.athletes.sort((a, b) => {
            a.oSortDetails.surname.toLowerCase().localeCompare(b.oSortDetails.surname); // TODO: change surname variable
          });
        } else if (oSortDetails.sortingOrder === "Descending") {
          oAthletes.athletes.sort((a, b) => {
            b.oSortDetails.surname.toLowerCase().localeCompare(a.oSortDetails.surname);
          });
        }
        return oAthletes;
      });
    },
    selectTableSorting: function (oState) {
      const sActiveView = this.commonSelectors.selectActiveView(oState);
      if (oState.appState[sActiveView].table.sorting) {
        return {
          ...oState.appState[sActiveView].table.sorting
        };
      }
    },
    selectTableFiltering: function (oState) {
      const sActiveView = this.commonSelectors.selectActiveView(oState);
      if (oState.appState[sActiveView].table.search) {
        return {
          ...oState.appState[sActiveView].table.search
        };
      }
    }
  });
});
