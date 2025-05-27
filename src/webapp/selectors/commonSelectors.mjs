import * as Reselect from 'reselect'

    
export const selectAthletes = function (state){
            return state.entities.athletes
    };

export const selectCurrentAthlete = function (state){
            return state.ui.currentAthlete
    };

export const selectAthleteTrainingSessions = function (oState){
            const nCurrentAthlete = selectCurrentAthlete(oState);
            if(oState.entities.athletes.athletes[nCurrentAthlete].trainingSessions){
                return oState.entities.athletes.athletes[nCurrentAthlete].trainingSessions
            }
            return null
    };

export const selectAppLoading = function (state){
            return state.ui.appLoading
    };

export const selectActiveView = function(oState) {
            return oState.ui.activeView
    };

export const selectActiveRoute = function(oState) {
            return oState.ui.activeRoute
    };

export const selectRouteParameters = function(oState) {
            return oState.ui.routeParameters
    };

export const selectUniqueAthleteId = function(oState) {
            const arrAthletes = oState.entities.athletes.athletes;
            return arrAthletes[arrAthletes.length-1]._id + 1

    };

export const selectTableSorting = function(oState, sEntity){ // BUG: izsutas action, pamainas active view, un panem sortingu no nepareiza view
            if(oState.app.sorting[sEntity]){
                return{
                ...oState.app.sorting[sEntity]
                }
            }
            return null
    };

export const selectTableFiltering = function(oState, sEntity){
            if(oState.app.filters[sEntity]){
                return{
                ...oState.app.filters[sEntity]
                }
            }
            return null
    };

export const selectVisibleAthletes = Reselect.createSelector([selectAthletes, selectTableFiltering, selectTableSorting], (oAthletes, oFilterDetails, oSortDetails) =>{   // Returns athletes with sorting and filtering
        var oCopyAthletes = JSON.parse(JSON.stringify(oAthletes));

        // Sorting
        if(oSortDetails && oSortDetails.attribute.length !== 0){
            for(const sSortAttribute of oSortDetails.attribute){
                
                if(oSortDetails.order === "ASC"){ // Sorting table
                    oCopyAthletes.athletes.sort((a, b) => a[sSortAttribute].localeCompare(b[sSortAttribute]));
                }else if (oSortDetails.order === "DESC"){
                    oCopyAthletes.athletes.sort((a, b) => b[sSortAttribute].localeCompare(a[sSortAttribute]))
                }
            }
        } 

        // Filtering 
        if(oFilterDetails && oFilterDetails.query !== ""){
            for(const sFilterAttribute of oFilterDetails.attribute){
                oCopyAthletes.athletes = oCopyAthletes.athletes.filter((oAthlete) => oAthlete[sFilterAttribute].toLowerCase().includes(oFilterDetails.query.toLowerCase()));
            }
        }
            return oCopyAthletes
    });

export const selectVisibleSessions = Reselect.createSelector([selectAthleteTrainingSessions, selectTableFiltering, selectTableSorting], (oTrainingSessions, oFilterDetails, oSortDetails) =>{   // implement for training sessions
        const oCopySessions = JSON.parse(JSON.stringify(oTrainingSessions));

         // Sorting
        if(oSortDetails && oSortDetails.attribute.length !== 0){
            for(const sSortAttribute of oSortDetails.attribute){
                
                if(oSortDetails.order === "ASC"){ // Sorting table
                    oCopySessions.sort((a, b) => new Date(a[sSortAttribute]) - new Date(b[sSortAttribute]));
                }else if (oSortDetails.order === "DESC"){
                    oCopySessions.sort((a, b) => new Date(b[sSortAttribute]) - new Date(a[sSortAttribute]));
                }
            }
        } 
        // Filtering 
        if(oFilterDetails && oFilterDetails.query !== ""){
            for(const sFilterAttribute of oFilterDetails.attribute){
                oCopySessions.filter((oSession) => oSession[sFilterAttribute].toLowerCase().includes(oFilterDetails.query.toLowerCase()));
            }
        }

        return {trainingSessions: oCopySessions}
    })