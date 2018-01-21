import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {getExamsWithSubjects} from "../Entities/ExamRepository";
import {ColorContainer} from "../components/ColorContainer";
import {colors, defaultContainer, text} from "../styles";
import {Card, Text} from "react-native-elements";
import moment from "moment";
import {Ionicons} from "@expo/vector-icons";
import {Database} from "../Database.js";

export default class Exams extends React.Component {

    state = {
        exams: []
    };

    componentDidMount = () => {
        this._loadExams();
    };

    _loadExams = () => {
        this.setState({exams: []});
        getExamsWithSubjects(exam => {
            this.setState(prevState => ({exams: [...prevState.exams, exam]}));
        });
    };

    componentWillReceiveProps(nextProps) {
        this._loadExams();
    }

    render = () =>
        <ColorContainer color={colors.exams.colorContainer}>
            <View style={{...defaultContainer, justifyContent: 'flex-start'}}>

                <Text h3 style={{...text, textAlign: 'center'}}>Your exams</Text>

                {this.state.exams.length > 0 &&
                <ScrollView containerStyle={{flex: 1, justifyContent: 'flex-start'}}>
                    {this.state.exams.map(exam =>
                        <Card key={exam.id}>
                            <View style={{flex: 1}}>
                                <View style={{
                                    flex: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text h4>{exam.name}</Text>
                                    <Text>{moment(exam.examtimestamp).format('DD-MM-YYYY')}</Text>
                                </View>
                                <View style={{flex: 0}}>
                                    <Text>{exam.subjects.filter(subject => subject.completed).length} subjects
                                        completed
                                        out of {exam.subjects.length}</Text>
                                </View>
                                <View style={{flex: 0}}>
                                    {exam.subjects.map(subject => <View key={subject.id} style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: 20
                                    }}>
                                        <Text style={{fontSize: 18}}>
                                            {subject.name} - {subject.studytimestamp.format('DD-MM-YYYY')}
                                        </Text>
                                        <TouchableOpacity style={{opacity: (subject.completed ? 1 : 0.3)}}
                                                          onPress={() => this._toggleSubjectCompleted(subject)}>
                                            {
                                                (subject.completed &&
                                                    <Ionicons name="ios-checkmark-circle" size={25} color="green"/>) ||
                                                <Ionicons name="ios-checkmark-circle-outline" size={25} color="red"/>
                                            }
                                        </TouchableOpacity>
                                    </View>)}
                                </View>
                            </View>
                        </Card>
                    )}
                </ScrollView>
                }

                {this.state.exams.length === 0 && <Text h4 style={{
                    marginTop: 30,
                    textAlign: 'center',
                    color: colors.textLight,
                    backgroundColor: 'transparent'
                }}>You have no exams planned yet!</Text>}

            </View>
        </ColorContainer>;

    _toggleSubjectCompleted = (subject) => {
        const value = subject.completed ? 0 : 1;
        Database.query("update subjects set completed = ? where id = ?", [value, subject.id], this._loadExams);
        // const examIndex = this.state.exams.indexOf(examToTest => subject.exam_id === examToTest.id);
        // const exam = {...this.state.exams[examIndex]};
        // const index = [...exam.subjects.indexOf(subjectToTest => subjectToTest.id === subject.id)];
        // const newSubjects = this.state.exam.
    };
}