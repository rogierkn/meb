import {Database} from "../Database";
import {getExam} from "./ExamRepository";
import {getSubjectsForSession} from "./SubjectRepository";


const getSessions = (callback, orderAsc = true) => {
    const order = 'order by studytimestamp ' + (orderAsc ? 'ASC' : 'DESC');
    Database.query('select * from sessions ' + order, [], callback);
};

const getSessionsWithRelations = callback => getSessions(sessions => sessions.forEach(session => getExam(session.exam_id, exams => {
    if (exams.length > 0) {
        session.exam = exams[0];
    }
    // getSubjectsForSession(session, subjects => {
    //     session.subjects = subjects;
    //     callback(session);
    // });
})));


export {
    getSessions,
    getSessionsWithRelations
}