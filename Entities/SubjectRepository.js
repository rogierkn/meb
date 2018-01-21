import {Database} from "../Database";
import moment from "moment/moment";


const getSubjectsByTimestamp = (callback) => {
    Database.query('select * from subjects where completed = 0 order by studytimestamp ASC ', [], subjects => {
        subjects.forEach(subject => subject.studytimestamp = moment.unix(subject.studytimestamp));
        callback(subjects);
    });
};


const createSubjects = (subjectsParameters, examId, callback) => {
    const insertString = (Array(subjectsParameters.length / 4).fill('(?, ?, ?, ?)')).join(', ');
    Database.insert(`insert into subjects (name, exam_id, studytimestamp, completed) values ${insertString}`, subjectsParameters, callback);
};

const getSubjectsForExam = (examId, callback) => {
    Database.query('select * from subjects where exam_id = ? order by studytimestamp asc', [examId], subjects => {
        subjects.forEach(subject => subject.studytimestamp = moment.unix(subject.studytimestamp));
        callback(subjects);
    });
};

export {
    getSubjectsByTimestamp,
    createSubjects,
    getSubjectsForExam
}

