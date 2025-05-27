import { expect } from 'chai';
import {
	selectAthletes,
	selectActiveView,
    selectVisibleAthletes
} from '../../../src/webapp/selectors/commonSelectors.mjs';
import * as Redux from 'redux'
import { entityReducer } from '../../../src/webapp/features/entitySlice.mjs'
import { appReducer } from '../../../src/webapp/features/appSlice.mjs'
import { uiReducer } from '../../../src/webapp/features/uiSlice.mjs'


describe('Selectors', () => {
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
                },
                trainingSessions: {},
                games: {}
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

	describe('selectAthletes', () => {
		it('selectAthletes - default', () => {
			// Given
			const storeState = store.getState();
			// When
			const result = selectAthletes(storeState);
			// Then
			expect(result).deep.equals({athletes: [
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
            ]});
		});
	});

	describe('selectActiveView', () => {
		it('selectActiveView - default', () => {
			// Given
			const storeState = store.getState();
			// When
			const result = selectActiveView(storeState);
			// Then
			expect(result).equals("Startpage");
		});
	});

    describe('selectVisibleAthletes', () => {
		it('selectVisibleAthletes - default', () => {
			// Given
			const storeState = store.getState();
			// When
			const result = selectVisibleAthletes(storeState, "athletes");
			// Then
			expect(result).deep.equals({athletes: [
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
            ]});
		}),

        it('selectVisibleAthletes - sorting by surname, ascending', () => {
			// Given
            const mockedState = {
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
                },
                trainingSessions: {},
                games: {}
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
                        attribute: ["surname"],
                        order: "ASC"
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
			// When
			const result = selectVisibleAthletes(mockedState, "athletes");
			// Then
			expect(result).deep.equals({athletes: [
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
                {
                    "_id": 2,
                    "name": "John",
                    "surname": "Smith",
                    "age": 33,
                    "gender": "male",
                    "position": "Full-back"
                },
                
            ]});
		});
        it('selectVisibleAthletes - sorting by surname, descending', () => {
			// Given
			const mockedState = {
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
                    },
                    trainingSessions: {},
                    games: {}
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
                            attribute: ["surname"],
                            order: "DESC"
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
			// When
			const result = selectVisibleAthletes(mockedState, "athletes");
			// Then
			expect(result).deep.equals({athletes: [
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
                    "_id": 1,
                    "name": "Herring",
                    "surname": "Carlson",
                    "age": 29,
                    "gender": "male",
                    "position": "Full-back"
                },
                
            ]});
		});
	});

});
