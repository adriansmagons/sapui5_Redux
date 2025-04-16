sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "ui5/fitnessApp/utils/DataPreprocessor",
   "ui5/fitnessApp/store",
], (UIComponent, JSONModel, ResourceModel, DataPreprocessor, Store) => {
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

                // set model and set data for the model
                oAthleteModel.setData(preprocessor.processAthletes(result));
                this.setModel(oAthleteModel, "athleteModel")

                // create initial state for store and instantiate store
                const initState = {
                    athletes: preprocessor.processAthletes(result),
                    appState: {
                        athleteDetails: {},
                        startPage: {
                            surname_sorting: "default",
                        },
                    },
                    uiState: {
                        StartpageView:{
                            visible: true
                        },
                        AthleteDetailsView:{
                            visible: false
                        },
                        ProfileView:{
                            visible: false
                        }
                    },
                };
                // instantiate store with initState
                const store = new Store(initState);
                this.reduxStore = store.store;
                this.reduxStore.subscribe(() =>
                    console.log('State after dispatch: ', this.reduxStore.getState())
                  )

            });
        
            const i18nModel = new ResourceModel({
                bundleName: "ui5.fitnessApp.i18n.i18n"
             });
             this.setModel(i18nModel, "i18n");
             
            this.getRouter().initialize();
		},

    });
 });
 