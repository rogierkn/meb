import React from 'react';
import {StyleSheet} from 'react-native';
import Home from "./pages/Home";
import Session from "./pages/Session";
import {Router, Scene, Stack} from "react-native-router-flux";
import GenerateSchedule from "./pages/GenerateSchedule";


export default class App extends React.Component {

    state = {
        pages: [
            {
                component: Home,
                key: 'home',
                name: 'Home',
            },
            {
                component: Session,
                key: 'session',
                name: 'Session',
            },
            {
                component: GenerateSchedule,
                key: 'generateSchedule',
                name: 'Generate Schedule',
            }
        ],
        selectedPage: 0,
    };

    render = () =>
        <Router>

            <Stack key="root">
                {
                    this.state.pages.map(page => {
                        return <Scene key={page.key} component={page.component}/>;
                    })
                }
            </Stack>
        </Router>
}