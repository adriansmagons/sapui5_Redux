
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
    "ui5/fitnessApp/actions/commonActions",
    "sap/m/MessageToast",
], (UIComponent, JSONModel, ResourceModel, DataPreprocessor, Store, Sorter, Filter, FilterOperator, FilterType, commonSelectors, commonActions, MessageToast) => {
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
            this.setModel(oAthleteModel, "athleteModel");

             var oAthleteDetailsModel = new JSONModel();
            oAthleteDetailsModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            this.setModel(oAthleteDetailsModel, "athleteDetailsModel");

            // router reference
            this.oRouter = this.getRouter();

            // fetch data and preprocess
            const aUrls = ['/client/model/data/athletes.json', '/client/model/data/training_sessions.json'];
            const preprocessor = new DataPreprocessor();

                // create initial state for store and instantiate store
                const initState = {
                    entities: {
                        athletes: {},
                        trainingSessions: {},
                        games: {}
                    },
                    app: {
                        filters:{
                            athletes:{
                                attribute: ["surname"],
                                query: ""
                            }
                        },
                        sorting: {
                            athletes: {
                                attribute: [""],
                                order: ""
                            },
                            trainingSessions: {
                                attribute: ["date"],
                                order: "ASC"
                            }
                        }
                    },
                    ui: {
                        activeRoute: "home",
                        activeView: "Startpage",  
                        currentAthlete: null,
                        routeParameters: {},
                        appLoading: false
                    },
                };
                // instantiate store with initState
                const store = new Store(initState);
                this.reduxStore = store.store;

                // loading data 
                this.commonActions = new commonActions();
                preprocessor.fetchData(aUrls).then((result)=>{
                    const oLoadDataAction = this.commonActions.loadData({oData: preprocessor.processAthletes(result), sEntityName: "athletes"});
                    this.reduxStore.dispatch(oLoadDataAction);
                });

                // Callback in case of store change
                this.reduxStore.subscribe(() =>{
                    console.log('State after dispatch: ', this.reduxStore.getState())
                    const oState = this.reduxStore.getState();

                    this.oRouter.navTo(commonSelectors.selectActiveRoute(oState), commonSelectors.selectRouteParameters(oState));

                    // Reset model data if changes are present
                    oAthleteModel.setData(commonSelectors.selectVisibleAthletes(oState, "athletes"));

                    // Set visible sessions data
                    if(commonSelectors.selectActiveView(oState) === "AthleteDetails"){
                         oAthleteDetailsModel.setData(commonSelectors.selectVisibleSessions(oState, "trainingSessions"));
                    }
                    
                })

            const i18nModel = new ResourceModel({
                bundleName: "ui5.fitnessApp.i18n.i18n"
             });
             this.setModel(i18nModel, "i18n");
             
            this.getRouter().initialize();
		},

    });
 });
 