import {Database} from "../Database";

const getExam = (id, callback) => {
    Database.query('select * from exams where id = ? limit 1', [id], callback);
};

export {
    getExam
}