const directoryHelper = require('../helpers/directory_helper');

const db = (()=>{
    const sequelize = require("sequelize");
          
    
    let instance = null,
        models = {};
    
    function connect (){
        instance = new sequelize('my-store', 'postgres', '#gt512M4a1', {
            host: 'localhost',
            dialect: 'postgres',
        });
    }

    async function syncronizeModels  (){
        try {
            connect();
            let modelsFound = await getModels("./models");
            setModels();
            bindModels();
            await instance.sync();
        } catch (error) {
            console.error("Erro encontrado: ", error);
        }
    }

     function bindModels(){
            console.info("Binding Models");
            try {
                Object.keys(models)
                .forEach((item, index)=>{                     
                      models[item].instance.bind(models);
                 });
            } catch (error) {
                console.error("There is an error: ", error);
            }
    
    }


    function setModels(){
        console.info("Setting Models");
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

    return{
        Exec: syncronizeModels,
        Model:()=>{
            return Object.keys(models)
                         .map((element, index)=> { 
                             return models[element].model; 
                          });
        }
    }
})();

module.exports = db;