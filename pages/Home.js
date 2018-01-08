import * as React from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import {Actions} from "react-native-router-flux";


export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <View>
            <Text>Home page</Text>
            <Button title="Go to session" onPress={Actions.session}/>
            <Button title="Go to generate schedule" onPress={Actions.generateSchedule}/>
        </View>;
    }


}