class DatabaseWrapper {

    constructor() {
        this.db = Expo.SQLite.openDatabase('buddy');


        // this.query("SELECT * FROM sqlite_master WHERE type='table';", [], rows => {
        //     rows.forEach(row => {
        //         console.log(row);
        //         this.query(".schema", [row.name], console.log);
        //     });
        // });


        this.dropTables();
        this.createTables();

        this.db.transaction(tx => {
            tx.executeSql('INSERT INTO exams (name, examtimestamp) VALUES ("Cognition & emotion exam", DateTime("now", "+10 day"))');
            tx.executeSql('INSERT INTO sessions (studytimestamp, exam_id) VALUES (DateTime("now", "+1 day"), 1)');
            tx.executeSql('INSERT INTO subjects (name, session_id) VALUES ("hoi", 1)');
            tx.executeSql('INSERT INTO subjects (name, session_id) VALUES ("hallo", 1)');
            tx.executeSql('INSERT INTO subjects (name, session_id) VALUES ("hey", 1)');
            tx.executeSql('INSERT INTO subjects (name, session_id) VALUES ("goedendag", 1)');
        }, console.error);


    }


    createTables = () => {
        this.db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS exams (id INTEGER PRIMARY KEY AUTOINCREMENT, name string, examtimestamp INTEGER);');
            tx.executeSql('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, studytimestamp INTEGER, exam_id INTEGER);');
            tx.executeSql('CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name string, session_id INTEGER);')
        }, console.error, () => console.log("created tables"));
    };


    dropTables = () => {
        this.db.transaction(tx => tx.executeSql('DROP TABLE IF EXISTS subjects;'), console.error, () => console.log("dropped subjects"));
        this.db.transaction(tx => tx.executeSql('DROP TABLE IF EXISTS sessions;'), console.error, () => console.log("dropped sessions"));
    };


    query = (query, parameters = [], callback = () => {}) => {
        this.db.transaction(tx => {
            tx.executeSql(query, parameters, (_, {rows}) => callback(rows._array));
        }, console.error, () => console.log('successful query: ' + query));
    }
}


export const Database =  new DatabaseWrapper();