/**
 * Loading main libraries
 */
const express = require('express'),
      db = require('./db/db'),
      bodyParser = require('body-parser'),
      application = express(),
      router = require('./routes/router');
      

/**
 * Point which type of request the application will allow to receive an treat
 */
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.use(bodyParser.text());

/**
 * Configuring DataBase and controllers
  */

StartAppCore();

async function StartAppCore(){
    try {
        await db.Exec();
        
        let entities = await db.Model();
        
        await router.Register(entities, application);

        let port = 3500;
        
        application.listen(port, ()=>{ console.info(`The shit happens on ${port}`); });

    } catch (error) {
        console.error("Houve um erro aqui...", error);
    }
    
    

    
}

