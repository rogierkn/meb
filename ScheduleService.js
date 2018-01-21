import {createExam} from "./Entities/ExamRepository";
import {createSubjects} from "./Entities/SubjectRepository";
import moment from "moment";

const generateSchedule = ({examName, examDate, subjects}, callback) => {

    if(subjects.length === 0) return;


    createExam(examName, examDate.unix(), examId => {

        const examDateMoment = moment(examDate);
        const daysDiff = examDateMoment.diff(moment(), 'days'); // -1 because studying on examdate itself is... impossible
        const subjectCount = subjects.length;


        let periodInterval = daysDiff / subjectCount;

        // So we even out the period if only 1 subject
        if (periodInterval === daysDiff) {
            periodInterval /= 2;
        }

        const studyMoment = moment();

        const subjectsParams = subjects.reduce((carry, subject) => {
            studyMoment.add(periodInterval, 'days');
            carry.push(subject, examId, studyMoment.unix(), 0);
            return carry;
        }, []);

        createSubjects(subjectsParams, examId, () => {
            callback();
        });
    });




};

export {
    generateSchedule
}