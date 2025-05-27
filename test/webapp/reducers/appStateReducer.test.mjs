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

    describe('SORT_TABLE', () => {
        it('SORT_TABLE - surname, ascending, athletes entity', () => {
            // Given
            const mockedAppState = {
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
            };
            const oAction = {
                type: "SORT_TABLE",
                payload: {
                    sOrder: "ASC",
                    sAttribute: ["surname"],
                    sEntityName: "athletes"
                }
            };
            // When
            const result = appReducer(mockedAppState, oAction);
            // Then
            expect(result).deep.equals({
                filters:{
                    athletes:{
                        attribute: [],
                        query: ""
                    }
                },
                sorting: {
                    athletes: {
                        attribute: ["surname"],
                        order: "ASC"
                    },
                    trainingSessions: {
                        attribute: [],
                        order: ""
                    }
                }
            });
        });
        it('SORT_TABLE - age, descending, athletes entity', () => {
            // Given
             const mockedAppState = {
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
            };
            const oAction = {
                type: "SORT_TABLE",
                payload: {
                    sOrder: "DESC",
                    sAttribute: ["age"],
                    sEntityName: "athletes"
                }
            };
            // When
            const result = appReducer(mockedAppState, oAction);
            // Then
            expect(result).deep.equals({
                filters:{
                    athletes:{
                        attribute: [],
                        query: ""
                    }
                },
                sorting: {
                    athletes: {
                        attribute: ["age"],
                        order: "DESC"
                    },
                    trainingSessions: {
                        attribute: [],
                        order: ""
                    }
                }
            });
        });
    });


});
