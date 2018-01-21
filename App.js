import React from 'react';
import Home from "./pages/Home";
import NewSchedule from "./pages/NewSchedule";
import {colors} from "./styles";
import {Ionicons} from "@expo/vector-icons";
import {TabNavigator} from "react-navigation";
import Exams from "./pages/Exams";
import StudySession from "./pages/StudySession";
import {StatusBar, View} from "react-native";


const TabNav = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={24}
                                                            color={colors.home.accent}/>
        }
    },

    NewSchedule: {
        screen: NewSchedule,
        navigationOptions: {
            tabBarLabel: 'New exam',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
                                                            size={24} color={colors.home.accent}/>
        }
    },
    Exams: {
        screen: Exams,
        navigationOptions: {
            tabBarLabel: 'Exams',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-list-box" : "ios-list-box-outline"}
                                                            size={24} color={colors.home.accent}/>,
        }
    },
    StudySession: {
        screen: StudySession,
        navigationOptions: {
            tabBarLabel: 'Study Session',
            tabBarIcon: ({tintColor, focused}) => <Ionicons name={focused ? "ios-timer" : "ios-timer-outline"}
                                                            size={24} color={colors.home.accent}/>,
        }
    }
}, {
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: colors.home.accent,
        inactiveTintColor: colors.home.accentLight,
        style: {
            backgroundColor: colors.lightBackground,
        },
    },
    initialRouteName: 'Home',

});


export default class App extends React.Component {

    _onNavigationStateChange = (prevState, newState) => {
        this.setState({...this.state, route_index: newState.index});
    };


    render = () => <View style={{flex: 1}}>
        <StatusBar hidden/>
        <TabNav onNavigationStateChange={this._onNavigationStateChange} screenProps={this.state}/>
    </View>

}