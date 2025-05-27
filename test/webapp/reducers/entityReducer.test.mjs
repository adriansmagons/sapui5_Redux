import { expect } from 'chai';
import * as Redux from 'redux'
import { entityReducer } from '../../../src/webapp/features/entitySlice.mjs'
import { appReducer } from '../../../src/webapp/features/appSlice.mjs'
import { uiReducer } from '../../../src/webapp/features/uiSlice.mjs'


describe('App state reducers', () => {
    let store;

    beforeEach(() => {
        // Set default store state.
        const initialState = {
            entities: {
                athletes:{
                        athletes: [
                            {
                                "_id": 1,
                                "name": "Herring",
                                "surname": "Carlson",
                                "age": 29,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 2,
                                "name": "John",
                                "surname": "Smith",
                                "age": 33,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 3,
                                "name": "Adam",
                                "surname": "Jobs",
                                "age": 24,
                                "gender": "male",
                                "position": "Centre-back"
                            }
                        ]
                }
            },
            app: {
                filters:{
                    athletes:{
                        attribute: [],
                        query: ""
                    }
                },
                sorting: {
                    athletes: {
                        attribute: [],
                        order: ""
                    },
                    trainingSessions: {
                        attribute: [],
                        order: ""
                    }
                }
            },
            ui: {
                activeRoute: "home",
                activeView: "Startpage",
                currentAthlete: null,
                routeParameters: {}
            },
        };

        store = Redux.createStore(Redux.combineReducers({
            entities: entityReducer,
            app: appReducer,
            ui:  uiReducer
        }), initialState);

    });

    describe('INSERT_ATHLETE', () => {
        it('INSERT_ATHLETE - test 1', () => {
            // Given
            const mockedAppState = {
                athletes:{
                    athletes:[
                        {
                                "_id": 1,
                                "name": "Herring",
                                "surname": "Carlson",
                                "age": 29,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 2,
                                "name": "John",
                                "surname": "Smith",
                                "age": 33,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 3,
                                "name": "Adam",
                                "surname": "Jobs",
                                "age": 24,
                                "gender": "male",
                                "position": "Centre-back"
                            }
                    ]
                }
            }
            const oAction = {
                type: "INSERT_ATHLETE",
                payload: {
                    oAthlete: {_id: 4, name: "Lisa", surname: "Johns", age: 33, gender: "female", position: "Back"}
                }
            };
            // When
            const result = entityReducer(mockedAppState, oAction);
            // Then
            expect(result).deep.equals({
                athletes:{
                    athletes:[
                        {
                                "_id": 1,
                                "name": "Herring",
                                "surname": "Carlson",
                                "age": 29,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 2,
                                "name": "John",
                                "surname": "Smith",
                                "age": 33,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 3,
                                "name": "Adam",
                                "surname": "Jobs",
                                "age": 24,
                                "gender": "male",
                                "position": "Centre-back"
                            },
                             {
                                "_id": 4,
                                "name": "Lisa",
                                "surname": "Johns",
                                "age": 33,
                                "gender": "female",
                                "position": "Back"
                            }
                    ]
                }
            });
        });
        
    });

     describe('DELETE_ATHLETE', () => {
        it('DELETE_ATHLETE - test 1', () => {
            // Given
            const mockedAppState = {
                athletes:{
                    athletes:[
                        {
                                "_id": 1,
                                "name": "Herring",
                                "surname": "Carlson",
                                "age": 29,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 2,
                                "name": "John",
                                "surname": "Smith",
                                "age": 33,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 3,
                                "name": "Adam",
                                "surname": "Jobs",
                                "age": 24,
                                "gender": "male",
                                "position": "Centre-back"
                            }
                    ]
                }
            }
            const oAction = {
                type: "DELETE_ATHLETE",
                payload: {
                    sAthleteId: 2
                }
            };
            // When
            const result = entityReducer(mockedAppState, oAction);
            // Then
            expect(result).deep.equals({
                athletes:{
                    athletes:[
                            {
                                "_id": 1,
                                "name": "Herring",
                                "surname": "Carlson",
                                "age": 29,
                                "gender": "male",
                                "position": "Full-back"
                            },
                            {
                                "_id": 3,
                                "name": "Adam",
                                "surname": "Jobs",
                                "age": 24,
                                "gender": "male",
                                "position": "Centre-back"
                            },
                    ]
                }
            });
        });
        
    });


});
