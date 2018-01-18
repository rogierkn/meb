import {Database} from "../Database";


const getSubjects = (callback) => {
    Database.query('select * from subjects', [], callback);
};

const getSubjectsForSession = (session, callback) => {
    Database.query('select * from subjects where session_id = ?', [session.id], callback);
};


export {
    getSubjects,
    getSubjectsForSession
}

