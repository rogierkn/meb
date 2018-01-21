import {Database} from "../Database";
import {getSubjectsForExam} from "./SubjectRepository";
import moment from "moment";

const getExam = (id, callback) => {
    Database.query('select * from exams where id = ? limit 1', [id], callback);
};

const createExam = (name, date, callback) => {
    Database.insert('insert into exams (name, examtimestamp) values (?, ?)', [name, date], callback);
};

const getExamsWithSubjects = (callback) => {
    Database.query('select * from exams order by examtimestamp asc', [], (exams) => {
        exams.forEach(exam => getSubjectsForExam(exam.id, subjects => {
            exam.examtimestamp = moment.unix(exam.examtimestamp);
            exam.subjects = subjects;
            callback(exam);
        }));
    });
};

const getExamWithSubjects = (examId, callback) => {
    Database.query('select * from exams where id = ?', [examId], (exam) => {
        getSubjectsForExam(exam.id, subjects => {
            exam.examtimestamp = moment.unix(exam.examtimestamp);
            exam.subjects = subjects;
            callback(exam);
        });
    });
};

export {
    getExam,
    createExam,
    getExamsWithSubjects,
    getExamWithSubjects
}