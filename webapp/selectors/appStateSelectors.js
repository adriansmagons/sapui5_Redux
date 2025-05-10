sap.ui.define([], function() {
    
    return {
        selectTableId: function(state, sView){
            return state.appState[sView].table.table_id
        },
        selectTableSortBy: function(state, sView){
            return state.appState[sView].table.sort_by
        },
        selectTableSortOrder: function(state, sView){
            return state.appState[sView].table.sortingOrder
        },
        selectTableSearchBy: function(state, sView){
            return state.appState[sView].table.search_by_surname
        },

    }

});