sap.ui.define([], function() {
    
    function appStateReducer (state = {}, action) {
            switch (action.type) {
                case "SORT_TABLE":
                    return{
                        ...state,
                        [action.payload.sView]: {
                            table:{
                                table_id: action.payload.sTableId,
                                sort_by: action.payload.sSortBy,
                                sortingOrder: action.payload.sOrder
                            }
                        }
                    }
                case "REFRESH_TABLE":
                    return{
                        ...state,
                        Startpage:{
                            ...state.Startpage,
                            table:{
                                ...state.Startpage.table,
                                sortingOrder: action.payload.sOrder,
                                sort_by: action.payload.sSortBy
                            }
                        }
                    }
                case "SEARCH_BY_SURNAME":
                    return {
                        ...state,
                        Startpage:{
                            ...state.Startpage,
                            table:{
                                ...state.Startpage.table,
                                search_by_surname: action.payload.sQuery
                            }
                        }

                    }
                default: 
                    return state
            }
        }

        return appStateReducer

});