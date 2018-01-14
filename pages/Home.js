import * as React from "react";
import {View} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Button, Text} from "react-native-elements";

const Home = () => <View style={{flex: 1, justifyContent: 'space-around'}}>

    <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text h4>Upcoming session</Text>
        <Text style={{fontSize: 20}}>January 20th</Text>
        <Button style={{marginTop: 20}} title="Start Session" onPress={Actions.session}/>
    </View>
    <View style={{width: '100%'}}>
        <Button title="Generate new schedule" onPress={Actions.generateSchedule}/>
        <Button style={{marginTop: 20}} title="Schedule" onPress={Actions.schedule}/>
    </View>
</View>;

export default Home;
