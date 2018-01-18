import * as React from "react";
import {View} from 'react-native';
import {Text} from "react-native-elements";
import {Button} from "../components/Button";
import {colors, defaultContainer} from "../styles";
import {getSubjectsForSession} from "../Entities/SubjectRepository";
import {getSessions, getSessionsWithRelations} from "../Entities/SessionRepository";
import moment from "moment";


class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };

        this.loadSessions();
    }

    /**
     * Load the study sessions from local db
     */
    loadSessions = () => getSessionsWithRelations(session => this.setState({sessions: [...this.state.sessions, session]}));

    get upcomingSession() {
        if (this.state.sessions.length === 0) {
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text h2 style={{color: colors.textDark}}>Stop stressing</Text>
                    <Text h3 style={{color: colors.textDark}}>&</Text>
                    <Text h2 style={{color: colors.textDark}}>get planning!</Text>

                    <Text h4 style={{textAlign: 'center', marginTop: 30, color: colors.textDark}}>An exam coming up? Create your personal
                        schedule and tackle the exam without stress!</Text>

                    <Button style={{button: {marginTop: 20}}} title="Get started"
                            onPress={() => console.error("Get started button not impl")}/>
                </View>
            </View>
        }

        const session = this.state.sessions[0];
        const startofSession = moment(session.studytimestamp);
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text h4 style={{color: colors.textDark}}>Next session</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.textDark, marginTop: 20}}>{startofSession.fromNow()}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.textDark, marginTop: 20}}>{session.exam.name} - {moment(session.exam.examtimestamp).fromNow()}</Text>
            {
                startofSession.isBefore(moment()) &&
                <Text style={{fontSize: 20, color: colors.textDark}}>You are late, start studying quickly!</Text>
            }
            <Button style={{button: {marginTop: 10}}} title="Start Session" onPress={() => {
            }}/>


        </View>
    }

    render = () => <View style={{...defaultContainer, justifyContent: 'space-around'}}>


        {this.upcomingSession}
    </View>;
}


export default Home;
