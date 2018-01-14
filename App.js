import React from 'react';
import Home from "./pages/Home";
import Session from "./pages/Session";
import {Router, Scene, Stack} from "react-native-router-flux";
import GenerateSchedule from "./pages/GenerateSchedule";
import Schedule from "./pages/Schedule";


export default class App extends React.Component {

    state = {
        pages: [
            {
                component: Home,
                key: 'home',
                name: 'Home',
                title: 'My Exam Buddy'
            },
            {
                component: Session,
                key: 'session',
                name: 'Session',
                title: 'Study session'
            },
            {
                component: GenerateSchedule,
                key: 'generateSchedule',
                name: 'Generate Schedule',
                title: 'Generate new schedule'
            },
            {
                component: Schedule,
                key: 'schedule',
                name: 'Schedule',
                title: 'Schedule',
            }
        ],
        selectedPage: 0,
    };

    render = () =>
        <Router>
            <Stack key="root">
                {
                    this.state.pages.map(page => {
                        return <Scene key={page.key} component={page.component} title={page.title}/>;
                    })
                }
            </Stack>
        </Router>
}