sap.ui.define([
    "sap/ui/base/Object",
    "reselect",
], function(BaseObject, Reselect) {

    const selectAthletes = function (state){
            return state.athletes
    };

    const selectActiveView = function(oState) {
            return oState.uiState.activeView
    };

    const selectActiveRoute = function(oState) {
            return oState.uiState.activeRoute
    };
    const selectRouteParameters = function(oState) {
            return oState.uiState.routeParameters
    };

    const selectTableSorting = function(oState){
            const sActiveView = selectActiveView(oState);
            if(oState.appState[sActiveView].table.sorting){
                return{
                ...oState.appState[sActiveView].table.sorting
                }
            }
    };

    const selectTableFiltering = function(oState){
            const sActiveView = selectActiveView(oState);
            if(oState.appState[sActiveView].table.search){
                return{
                ...oState.appState[sActiveView].table.search
                }
            }
                
    };

    const selectVisibleAthletes = Reselect.createSelector([selectAthletes, selectTableSorting, selectTableFiltering], (oAthletes, oSortDetails, oFilterDetails) =>{   // Returns athletes with sorting and filtering
        const oCopyAthletes = oAthletes.athletes;

        // Sorting
        if(oSortDetails && oSortDetails.sort_by === "surname"){
            if(oSortDetails.sortingOrder === "Ascending"){ // Sorting table
                return {
                    athletes: [...oCopyAthletes].sort((a, b) => a.surname.localeCompare(b.surname))
                }
            }else if (oSortDetails.sortingOrder === "Descending"){
                return {
                    athletes: [...oCopyAthletes].sort((a, b) => b.surname.localeCompare(a.surname))
                }
            }else if (oSortDetails.sortingOrder === "None"){
                return oAthletes
            }
        } 

        // Filtering 

        if(oFilterDetails && oFilterDetails.search_query !== null){
            debugger
            //implement filtering
        }
            return oAthletes
    });

    const selectVisibleSessions = Reselect.createSelector([], () =>{   // implement for training sessions
        // if(oSortDetails.sort_by === "date"){
        //      if(oSortDetails.sortingOrder === "Ascending"){ // Sorting table
        //         return{
        //             oCopyAthletes.athletes.sort((a, b) => new Date(a.date) - new Date(b.date))
        //         }
        //     }else if (oSortDetails.sortingOrder === "Descending"){
        //         oCopyAthletes.athletes.sort((a, b) => new Date(b.date) - new Date(a.date))
        //     }else if (oSortDetails.sortingOrder === "None"){
        //         return oAthletes
        //     }
        // }
    })

    return{

        selectAthletes: selectAthletes,
        selectActiveRoute: selectActiveRoute,
        selectActiveView: selectActiveView,
        selectRouteParameters: selectRouteParameters,
        selectTableSorting: selectTableSorting,
        selectTableFiltering: selectTableFiltering,
        selectVisibleAthletes: selectVisibleAthletes,
        // selectTable: selectTable,
    }





});