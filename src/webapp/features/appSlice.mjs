
export const appReducer = function (state = {}, action) {
            switch (action.type) {
                case "SORT_TABLE":
                    return{
                        ...state,
                        sorting: {
                            ...state.sorting,
                            [action.payload.sEntityName]:{
                                attribute: action.payload.sAttribute,
                                order: action.payload.sOrder
                            }
                        }
                    }
                case "REFRESH_TABLE":
                    return{
                         ...state,
                        sorting: {
                            ...state.sorting,
                            [action.payload.sEntityName]:{
                                attribute: action.payload.sAttribute,
                                order: action.payload.sOrder
                            }
                        }
                    }
                case "SEARCH_BY":
                    return {
                       ...state,
                        filters: {
                            ...state.sorting,
                            [action.payload.sEntityName]:{
                                attribute: action.payload.sAttribute,
                                query: action.payload.sQuery
                            }
                        }

                    }
                default: 
                    return state
            }
        }
