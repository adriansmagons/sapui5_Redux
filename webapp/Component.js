sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "ui5/fitnessApp/utils/DataPreprocessor",
   "ui5/fitnessApp/store",
   "sap/ui/model/Sorter",
   "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "ui5/fitnessApp/selectors/commonSelectors",
], (UIComponent, JSONModel, ResourceModel, DataPreprocessor, Store, Sorter, Filter, FilterOperator, FilterType, commonSelectors) => {
    "use strict";
 
    return UIComponent.extend("ui5.fitnessApp.Component", {

        metadata : {
            "interfaces": ["sap.ui.core.IAsyncContentCreation"],
            "manifest": "json",
         },

        init() {
             // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // change default binding mode to oneway
            var oAthleteModel = new JSONModel();
            oAthleteModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            // fetch data and preprocess
            const aUrls = ['/model/data/athletes.json', '/model/data/training_sessions.json'];
            const preprocessor = new DataPreprocessor();
            preprocessor.fetchData(aUrls).then((result)=>{

                // create initial state for store and instantiate store
                const initState = {
                    athletes: preprocessor.processAthletes(result),    // Tip: Figure out what variables are needed for subscribe() callback and somehow represent these variables in state
                    appState: {
                        AthleteDetails: {
                            table:{
                                // table_id: "sessions_table",
                                sorting:{
                                    sort_by: "",
                                    sortingOrder: null,
                                },
                            },
                        },
                        Startpage: {
                            table:{
                                // table_id: "players_table",
                                sorting:{
                                    sort_by: "",
                                    sortingOrder: null,
                                },
                                search:{
                                    search_by: "",
                                    search_query: null
                                }
                            },
                        },
                    },
                    uiState: {
                        activeRoute: "home",
                        activeView: "Startpage",    // TODO: Change active view on router navigation
                        routeParameters: {}
                    },
                };
                // instantiate store with initState
                const store = new Store(initState);
                this.reduxStore = store.store;

                oAthleteModel.setData(commonSelectors.selectAthletes(this.reduxStore.getState()));
                this.setModel(oAthleteModel, "athleteModel")
                // TODO: Fix table sorting, searching and refresh. Use selectors and derive data
                this.reduxStore.subscribe(() =>{
                    console.log('State after dispatch: ', this.reduxStore.getState())
                     const oState = this.reduxStore.getState();

                    // Reset model data if changes are present
                    oAthleteModel.setData(commonSelectors.selectVisibleAthletes(oState));

                    this.getRouter().navTo(commonSelectors.selectActiveRoute(oState), commonSelectors.selectRouteParameters(oState));
                    
                })

            });

            const i18nModel = new ResourceModel({
                bundleName: "ui5.fitnessApp.i18n.i18n"
             });
             this.setModel(i18nModel, "i18n");
             
            this.getRouter().initialize();
		},
        registerStartpageView(oView) {
            this.oStartpageView = oView;
        },
        registerAthleteView(oView) {
            this.oAthleteDetailsView = oView;
        },

        // _updateStartpageView(oState){
        //     let sPlayerTableId = appStateSelectors.selectTableId(oState, "Startpage");
        //     let sPlayerTableSortBy = appStateSelectors.selectTableSortBy(oState, "Startpage");
        //     let sPlayerTableSortOrder = appStateSelectors.selectTableSortOrder(oState, "Startpage");
        //     this._sortTable(sPlayerTableId, sPlayerTableSortOrder, sPlayerTableSortBy, this.oStartpageView);

        //     const oTable = this.oStartpageView.byId(sPlayerTableId);
        //     const oBinding = oTable.getBinding("items");
        //     const sQuery = oState.appState.Startpage.table.search_by_surname;  //  change**(and implement selector)
        //     let aFilters = [];
        //     if (sQuery && sQuery.length > 0) {
        //         var filter = new Filter("surname", FilterOperator.Contains, sQuery);
        //         aFilters.push(filter);
        //     }
        //     // update list binding
        //     oBinding.filter(aFilters, "Application");  
        //     // FIX refresh
        // },

        // _updateAthleteDetailsView(oState){
        //     let sSessionsTableId = appStateSelectors.selectTableId(oState, "AthleteDetails");
        //     let sSessionsTableSortBy = appStateSelectors.selectTableSortBy(oState, "AthleteDetails");
        //     let sSessionsTableSortOrder = appStateSelectors.selectTableSortOrder(oState, "AthleteDetails");
        //     this._sortTable(sSessionsTableId, sSessionsTableSortOrder, sSessionsTableSortBy, this.oAthleteDetailsView); // bug here: view is undefined (probably not registered yet)   
        // },

        // _sortTable(sTableId, sSortOrder, sSortBy, oView){
        //     const oTable = oView.byId(sTableId);
        //     const aColumns = oTable.getColumns();
        //     const oSortColumn = aColumns[1];
        //     const oBinding = oTable.getBinding("items");
        //             if (sSortOrder === "Ascending") {
        //                 oBinding.sort([new Sorter(sSortBy, false)]);
        //                 oSortColumn.setSortIndicator("Ascending");
        //             } else if (sSortOrder === "Descending") {
        //                 oBinding.sort([new Sorter(sSortBy, true)]);
        //                 oSortColumn.setSortIndicator("Descending");
        //             } else {
        //                 oBinding.sort(sSortOrder);
        //                 oSortColumn.setSortIndicator("None");
        //             }
        // }

    });
 });
 