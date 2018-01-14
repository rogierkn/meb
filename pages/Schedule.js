import * as React from "react";
import {TouchableOpacity, View} from 'react-native';
import {List, ListItem, Text} from "react-native-elements";


export default class Session extends React.Component {


    subjects = ["January 10th: 1 chapter", "January 12th: 2 chapters", "January 15th: 1 chapter", "January 20th: 1 chapter"];
    state = {
        finished: ["January 10th: 1 chapter"]
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
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <View style={{marginTop: 50, alignSelf: 'flex-start', width: '100%'}}>
                <Text style={{marginLeft: 10}}>Study Sessions</Text>
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
                                              {this.state.finished.indexOf(subject) >= 0 &&
                                              <Text style={{color: '#37ff00', fontSize: 20}}>
                                                  &#x2713;
                                              </Text>
                                              }
                                          </TouchableOpacity>
                                      }/>
                        )
                    }
                </List>
            </View>
        </View>;

}