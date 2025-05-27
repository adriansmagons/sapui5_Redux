
export const entityReducer = function (state = {}, action) {
            switch (action.type) {
                case "LOAD_DATA":
                    return{
                        ...state,
                        [action.payload.sEntityName]: action.payload.oData
                    }
                case "INSERT_ATHLETE":
                    return{
                        ...state,
                        athletes: {
                            athletes:[
                                ...state.athletes.athletes,
                                action.payload.oAthlete
                            ]
                        }
                    }

                case "DELETE_ATHLETE":
                    return{
                        ...state,
                        athletes: {
                            athletes: state.athletes.athletes.filter(oAthlete => oAthlete._id !== action.payload.sAthleteId)
                        }
                    }

                case "INSERT_MULTIPLE_ATHLETES":
                     return{
                        ...state,
                        athletes: {
                            athletes: action.payload.oAthletes
                            
                        }
                    }
                default: 
                    return state
            }
        }

export const fetchAthletes = async function (dispatch, getState) {        // Async thunk middleware
    dispatch({type: 'LOADING', payload: {bLoading: true}})
  try {
    const response = await fetch('http://localhost:3000/api/athletes');
    const data = await response.json();

    dispatch({ type: 'INSERT_MULTIPLE_ATHLETES', payload: {oAthletes: data} })
    dispatch({type: 'LOADING', payload: {bLoading: false}})
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
}