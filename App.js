import React from 'react';
import Home from "./pages/Home";
import NewSchedule from "./pages/NewSchedule";
import {colors} from "./styles";
import {Ionicons} from "@expo/vector-icons";
import {TabNavigator} from "react-navigation";
import SubjectRepository, {getSubjectsForSession} from "./Entities/SubjectRepository";
import {getSessions} from "./Entities/SessionRepository";


const Navigator = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={24}
                                                            color={colors.accent}/>
        }
    },

    NewSchedule: {
        screen: NewSchedule,
        navigationOptions: {
            tabBarLabel: 'New exam',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
                                                            size={24} color={colors.accent}/>
        }
    }
}, {
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: colors.accent,
        inactiveTintColor: colors.accentLight,
        style: {
            backgroundColor: colors.lightBackground,
        },
    },
    initialRouteName: 'NewSchedule'
});


export default class App extends React.Component {


    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render = () => <Navigator/>

}