import * as React from "react";
import {View} from 'react-native';
import {Text} from "react-native-elements";
import {Button} from "../components/Button";
import {colors, defaultContainer} from "../styles";
import {getSubjectsByTimestamp} from "../Entities/SubjectRepository";
import moment from "moment";
import {ColorContainer} from "../components/ColorContainer";


class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        };

    }

    componentDidMount() {
        this._loadSessions();
    }

    componentWillReceiveProps(props) {
        this._loadSessions();
    }

    /**
     * Load the study sessions from local db
     */
    _loadSessions = () => getSubjectsByTimestamp(subjects => this.setState({subjects: subjects}));

    get upcomingSession() {
        if (this.state.subjects.length === 0) {
            return <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={{flex: 0, alignItems: 'center'}}>
                    <Text h2 style={{color: colors.textLight, backgroundColor: 'transparent'}}>Stop stressing</Text>
                    <Text h3 style={{color: colors.textLight, backgroundColor: 'transparent'}}>&</Text>
                    <Text h2 style={{color: colors.textLight, backgroundColor: 'transparent'}}>get planning!</Text>
                </View>

                <Text h4 style={{
                    textAlign: 'center',
                    marginTop: 30,
                    color: colors.textDark
                }}>{`Have an exam coming up?\n\nCreate your personal schedule and tackle the exam without stress!`}</Text>

                <Button style={{
                    button: {marginTop: 20, borderColor: colors.home.accent},
                    text: {color: colors.home.accent}
                }} title="Get started"
                        onPress={() => this.props.navigation.navigate('NewSchedule')}/>
            </View>
        }

        const subject = this.state.subjects[0];
        const startofSession = moment(subject.studytimestamp);
        return <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>

            <Text h2 style={{color: colors.textLight, backgroundColor: 'transparent'}}>
                Exam Stress Buddy
            </Text>

            <View style={{flex: 0, alignItems: 'center'}}>

                <Text h4 style={{color: colors.textDark, backgroundColor: 'transparent'}}>Next session</Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.textDark,
                    marginTop: 20
                }}>{subject.name}</Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.textDark,
                    marginTop: 20
                }}>{startofSession.fromNow()}</Text>
                {/*<Text style={{fontSize: 20, fontWeight: 'bold', color: colors.textDark, marginTop: 20}}>{subject.exam.name} - {moment(subject.exam.examtimestamp).fromNow()}</Text>*/}
            {
                startofSession.isBefore(moment()) &&
                <Text style={{fontSize: 20, color: colors.textDark}}>You are late, start studying quickly!</Text>
            }
                <Button
                    style={{
                        button: {borderColor: colors.home.accent, marginTop: 10},
                        text: {color: colors.home.accent}
                    }}
                    title="Start Session" onPress={() => this.props.navigation.navigate('StudySession')}/>
            </View>


        </View>
    }

    render = () => <ColorContainer color={colors.home.colorContainer}>
        <View style={{...defaultContainer, justifyContent: 'space-around'}}>
            {this.upcomingSession}
        </View>
    </ColorContainer>;
}


export default Home;
