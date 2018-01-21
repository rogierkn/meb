import React from "react";
import {ColorContainer} from "../components/ColorContainer";
import {colors, defaultContainer, text} from "../styles";
import {getSubjectsByTimestamp} from "../Entities/SubjectRepository";
import {ScrollView, TouchableWithoutFeedback, Vibration, View} from "react-native";
import {Card, Text} from "react-native-elements";
import moment from "moment/moment";
import {Button} from "../components/Button";
import {Database} from "../Database";


export default class StudySession extends React.Component {

    state = {
        subject: null,
        subjects: [],
        startedAt: moment(),
        timer: null,
        breakIn: 45,
    };

    componentDidMount = () => {
        this._loadSubjects();
    };

    _loadSubjects = () => {
        getSubjectsByTimestamp(subjects => {
            this.setState(prevState => ({subjects: subjects}));
        });
    };

    componentWillReceiveProps(nextProps) {
        this._loadSubjects();
    }

    render = () => <ColorContainer color={colors.studySession.colorContainer}>
        {(this.state.subject === null && this._renderSubjectsList()) || this._renderCurrentSubject()}
    </ColorContainer>;

    _renderCurrentSubject = () => {
        const subject = this.state.subject;

        return <View style={{...defaultContainer, justifyContent: 'flex-start'}}>
            <View style={{height: '40%'}}>
                <Text h3 style={{...text, textAlign: 'center'}}>Studying...</Text>

                <Text style={{
                    fontSize: 30,
                    marginTop: 40,
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    color: colors.textLight
                }}>
                    Next break in
                </Text>
                <Text style={{
                    fontSize: 45,
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    color: colors.textLight
                }}>
                    {this.state.breakIn} minutes
                </Text>
            </View>

            <View style={{height: '60%', flex: 1, justifyContent: 'space-between'}}>

                <View>
                    <Text style={{
                        color: colors.textDark,
                        backgroundColor: 'transparent',
                        fontSize: 24,
                        textAlign: 'center'
                    }}><Text>You should study</Text>

                    </Text>
                    <Text style={{
                        color: colors.textDark,
                        marginTop: 10,
                        backgroundColor: 'transparent',
                        fontSize: 30,
                        textAlign: 'center'
                    }}>{subject.name}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                    {
                        this.state.breakIn === 0 && <Button style={{
                            button: {borderColor: colors.studySession.accent},
                            text: {color: colors.studySession.accent}
                        }} title="Continue from break" onPress={() => this._continue()}/>
                    }

                    <Button style={{
                        button: {borderColor: colors.studySession.accent},
                        text: {color: colors.studySession.accent}
                    }} title="Complete session" onPress={() => this._completeSession(subject)}/>

                </View>


            </View>
        </View>
    };

    _continue = () => {
        this._startSession(this.state.subject);
    };

    _completeSession = (subject) => {
        clearInterval(this.state.timer);
        Database.query("update subjects set completed = 1 where id = ?", [subject.id], () => {
            const index = this.state.subjects.indexOf(test => test.id === subject.id);
            const copy = {...this.state.subjects[index]};
            copy.completed = true;
            const listCopy = [...this.state.subjects];
            listCopy.splice(index, 1);
            this.setState({subjects: listCopy, subject: null});
        });
    };

    _startSession = (subject) => {
        this.setState({
            subject: subject,
            startedAt: moment(),
            breakIn: moment().add(45, 'minutes').diff(moment(), 'minutes')
        });
        this._startTimer();
    };

    _startTimer = () => {
        this.setState({timer: setInterval(this.updateTimes, 1000)})
    };

    updateTimes = () => {
        this.setState({breakIn: this.state.startedAt.clone().add(45, 'minutes').diff(moment(), 'minutes')});
        if (this.state.breakIn === 0) {
            clearInterval(this.state.timer);
            Vibration.vibrate([400, 200, 400, 200, 400, 200, 400, 200, 400, 200, 400, 200]);
        }
    };

    _renderSubjectsList = () => {
        const subjects = this.state.subjects;

        return <View style={{...defaultContainer, justifyContent: 'flex-start'}}>


            {(this.state.subjects.length === 0 &&
                <Text h3 style={{...text, textAlign: 'center'}}>You are done, for now</Text>) ||
            <View>
                <Text h3 style={{...text, textAlign: 'center'}}>Pick study subject</Text>
                < ScrollView containerStyle={{flex: 1, justifyContent: 'flex-start'}}>
                    {subjects.map(subject =>
                        <TouchableWithoutFeedback onPress={() => this._startSession(subject)} key={subject.id}>
                            <Card>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{fontSize: 18}}>{subject.name}</Text>
                                    <Text>{moment(subject.studytimestamp).format('DD-MM-YYYY')}</Text>
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>
                    )}
                </ScrollView>
            </View>
            }
        </View>
    };
}