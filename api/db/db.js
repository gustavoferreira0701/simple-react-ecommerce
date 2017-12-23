const directoryHelper = require('../helpers/directory_helper');

const db = (()=>{
    const sequelize = require("sequelize");         
    
    let instance = null,
        models = {};
    
    function connect (){
        instance = new sequelize('my-store', 'postgres', '%develoPer1', {
            host: 'localhost',
            dialect: 'postgres',
            logging: false
        });
    }

    async function syncronizeModels  (){
        try {
                    connect();
            await   getModels("./models");
                    setModels();
                    bindModels();
            await   instance.sync({ force: true });            
        } catch (error) {
            console.error("Erro encontrado: ", error);
        }
    }

     function bindModels(){            
            try {
                Object.keys(models)
                .forEach((item, index)=>{                     
                        console.log(models[item]);
                      models[item].instance.bind(models);
                 });
            } catch (error) {
                console.error("There is an error: ", error);
            }    
    }


    function setModels(){
        
            try {
                if(models !== null){
                    Object.keys(models)
                          .forEach((item, index)=>{
                                models[item].model = models[item].instance.set(instance, sequelize);
                           });
                }
            }catch (error) {
                console.error("Erro encontrado: ", error);
            } 
    }

    async function getModels(directory) {
        
        try {
            let files = await directoryHelper.GetFilesAsync(directory);
            
            if(files !== null && Array.isArray(files)){

                let filePath = '';

                files.forEach((fileName,index) => {
                    filePath = `.${directory}/${fileName}`;
                    current = require(filePath);            
                    models[fileName.split('.')[0]] = {
                        'instance':current,
                        'model':null
                    }
                });
            }else{
                console.info("Caí aqui....");
            }

        } catch (error) {
            console.error("Houve um erro: ", error);
        }
    }

    function getEntities(){
        let entities = {};

        Object.keys(models)
              .forEach(function(element) {
                    entities[element] = models[element].model;
               });

        return entities;
    }

    return{
        SyncDB: syncronizeModels,
        GetModels:getEntities
    }
})();

module.exports = db;