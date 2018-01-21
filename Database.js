class DatabaseWrapper {

    constructor() {
        this.db = Expo.SQLite.openDatabase('buddy');


        // this.query("SELECT * FROM sqlite_master WHERE type='table';", [], rows => {
        //     rows.forEach(row => {
        //         this.query(".schema", [row.name], );
        //     });
        // });


        this.dropTables();
        this.createTables();

        this.db.transaction(tx => {
            // tx.executeSql('INSERT INTO exams (name, examtimestamp) VALUES ("Cognition & emotion exam", DateTime("now", "+10 day"))');
            // tx.executeSql('INSERT INTO subjects (name, exam_id, studytimestamp) VALUES ("hfdstk 15", 1, DateTime("now", "+3 day"))');
            // tx.executeSql('INSERT INTO subjects (name, exam_id, studytimestamp) VALUES ("hfdstk 1", 1, DateTime("now", "+3 day"))');

        }, console.error);


    }

    createTables = () => {
        this.db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS exams (id INTEGER PRIMARY KEY AUTOINCREMENT, name string, examtimestamp INTEGER);');
            tx.executeSql('CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name string, exam_id INTEGER, studytimestamp INTEGER, completed INTEGER DEFAULT 0);')
        }, console.error);
    };


    dropTables = () => {
        this.db.transaction(tx => tx.executeSql('DROP TABLE IF EXISTS subjects;'), console.error);
        this.db.transaction(tx => tx.executeSql('DROP TABLE IF EXISTS exams;'), console.error);
    };


    query = (query, parameters = [], callback = () => {}) => {
        this.db.transaction(tx => {
            tx.executeSql(query, parameters, (_, {rows}) => Array.isArray(rows._array) ? callback(rows._array) : callback([]));
        }, console.error);
    };

    insert = (query, parameters = [], callback = () => {
    }) => {
        this.db.transaction(tx => {
            tx.executeSql(query, parameters, (_, {insertId}) => callback(insertId));
        }, console.error);
    }
}


export const Database =  new DatabaseWrapper();