import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import DatePicker from "react-native-datepicker";
import {Button, List, ListItem} from "react-native-elements";
import {Actions} from "react-native-router-flux";


export default class GenerateSchedule extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            date: (new Date).getDate() + "-" + ((new Date).getMonth() + 1) + "-" + (new Date).getFullYear(),
            subjects: ['Subject 1', 'Subject 2'],
        };
    }

    _updateSubject = (index, text) => {
        const subjectsCopy = this.state.subjects.slice();
        subjectsCopy[index] = text;
        this.setState({subjects: subjectsCopy});
    };

    render = () =>
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text>Exam date:</Text>
                <DatePicker
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            display: 'none',
                        },
                    }}
                    onDateChange={date => this.setState({date: date})}
                />
            </View>
            <View style={styles.subjectsContainer}>
                <Text style={{marginLeft: 10}}>Subjects:</Text>
                <ScrollView style={{height: 300}} ref="scrollView">
                    <List>
                        {
                            this.state.subjects.map((subject, index) =>
                                <ListItem key={index}
                                          title={
                                              <TextInput style={{width: '100%'}} value={subject}
                                                         onChangeText={text => this._updateSubject(index, text)}
                                              />
                                          }
                                          rightIcon={<Button onPress={() => this._removeSubject(index)} title="-"/>}
                                />
                            )
                        }
                    </List>
                </ScrollView>
            </View>
            <Button style={{marginTop: 10}} title="+" onPress={this._addSubject}/>

            <View style={styles.bottomContainer}>
                <Button onPress={Actions.pop} title="Generate Schedule"/>
            </View>
        </View>;


    _removeSubject = (index) =>
        this.setState(prevState => ({
            subjects: [...prevState.subjects.slice(0, index), ...prevState.subjects.slice(index + 1)]
        }));

    _addSubject = () =>
        this.setState({subjects: [...this.state.subjects, 'Subject ' + (this.state.subjects.length + 1)]}, () => setTimeout(this.refs.scrollView.scrollToEnd, 50));


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 30,
    },
    dateContainer: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'

    },
    subjectsContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'baseline',
    },
    bottomContainer: {
        flex: 1,

        justifyContent: 'flex-end'
    }
});