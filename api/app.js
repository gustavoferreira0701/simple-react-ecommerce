
let db = require('./db/db'); 
async function Run() {
    await db.Exec();
    console.log(db.Model());
}

Run();
