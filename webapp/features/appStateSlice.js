sap.ui.define([], function() {
    
    function appStateReducer (state = {}, action) {
            switch (action.type) {
                case "SORT_TABLE":
                    return{
                        ...state,
                        [action.payload.sView]: {
                            table:{
                                ...state[action.payload.sView],
                                sorting:{
                                    table_id: action.payload.sTableId,
                                    sort_by: action.payload.sSortBy,
                                    sortingOrder: action.payload.sOrder
                                }
                            }
                        }
                    }
                case "REFRESH_TABLE":
                    return{
                        ...state,
                        [action.payload.sView]:{
                            table:{
                                ...state.table,
                                sorting:{
                                        ...state[action.payload.sView].table,
                                        sortingOrder: action.payload.sOrder,
                                        sort_by: action.payload.sSortBy
                                }
                            }
                        }
                    }
                case "SEARCH_BY":
                    return {
                        ...state,
                        [action.payload.sView]: {
                            table:{
                                ...state[action.payload.sView],
                                search:{
                                    search_by: action.payload.sSearchBy,
                                    search_query: action.payload.sQuery,
                                }
                            }
                        }

                    }
                default: 
                    return state
            }
        }

        return appStateReducer

});