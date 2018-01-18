import * as React from "react";
import {TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Button, List, ListItem, Text} from "react-native-elements";
import {defaultContainer} from "../styles";


export default class Session extends React.Component {


    subjects = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 5 & 6"];
    state = {
        finished: []
    };

    _markClick = (subject) => {
        let copy = this.state.finished.slice();
        if (copy.indexOf(subject) >= 0) {
            copy.splice(copy.indexOf(subject), 1);
        } else {
            copy.push(subject);
        }
        this.setState(() => ({finished: copy}));
    };

    render = () =>
        <View style={{...defaultContainer, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text h4>Session Info</Text>

            <View style={{marginTop: 50, alignSelf: 'flex-start', width: '100%'}}>
                <Text style={{marginLeft: 10}}>Subjects to study</Text>
                <List>
                    {
                        this.subjects.map((subject, index) =>
                            <ListItem key={index}
                                      title={
                                          <TouchableOpacity onPress={() => this._markClick(subject)}>
                                              <Text style={{width: '100%'}}>{subject}</Text>
                                          </TouchableOpacity>

                                      }
                                      rightIcon={
                                          <TouchableOpacity
                                              onPress={() => this._markClick(subject)}>
                                              <Text style={{color: this.checkMarkColor(subject), fontSize: 20}}>&#x2713;</Text>
                                          </TouchableOpacity>
                                      }/>
                        )
                    }
                </List>
            </View>

            <Text style={{marginTop: 50}} h4>Next break in <Text style={{fontWeight: 'bold'}}>12</Text> minutes</Text>

            <Text style={{marginTop: 50, fontSize: 20}}>Session started at 10:34</Text>

            <View style={{marginTop: 200}}>
                <Button title="End session" onPress={Actions.pop}/>
            </View>

        </View>;

    checkMarkColor(subject) {
        if (this.state.finished.indexOf(subject) >= 0) {
            return '#37ff00';
        }
        return '#57c5ff';
    }
}