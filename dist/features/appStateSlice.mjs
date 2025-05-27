
export const appStateReducer = function (state = {}, action) {
            switch (action.type) {
                case "SORT_TABLE":
                    return{
                        ...state,
                        [action.payload.sView]: {
                            ...state[action.payload.sView],
                            table:{
                                ...state[action.payload.sView].table,
                                sorting:{
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
                            ...state[action.payload.sView],
                            table:{
                                ...state[action.payload.sView].table,
                                sorting:{
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
                             ...state[action.payload.sView],
                            table:{
                                ...state[action.payload.sView].table,
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
