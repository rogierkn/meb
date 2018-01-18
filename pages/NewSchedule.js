import React from "react";
import {ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import DatePicker from "react-native-datepicker";
import {Card, Text} from "react-native-elements";
import {colors, defaultContainer, text} from "../styles";
import {Button} from "../components/Button";
import {Ionicons} from "@expo/vector-icons";
import Prompt from "rn-prompt";
import {ColorContainer} from "../components/ColorContainer";


export default class NewSchedule extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: (new Date).getDate() + "-" + ((new Date).getMonth() + 1) + "-" + (new Date).getFullYear(),
            subjects: ['Subject 1', 'Subject 2'],

            subjectPromptVisible: false,
            editSubjectIndex: null,
        };
    }

    _updateSubject = (index, text) => {
        const subjectsCopy = this.state.subjects.slice();
        subjectsCopy[index] = text;
        this.setState({subjects: subjectsCopy});
    };

    render = () =>
        <ColorContainer>
            <View style={{...defaultContainer, justifyContent: 'space-between'}}>

                <View style={{flex: 4, justifyContent: 'flex-start'}}>
                    <Text h3 style={{...text, textAlign: 'center'}}>Plan your exam</Text>

                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 3}}>
                            <Text h4 style={text}>Exam name</Text>
                            <TextInput style={{
                                height: 40,
                                fontSize: 20,
                                color: colors.textDark,
                                borderBottomColor: colors.accentDark,
                                borderBottomWidth: 1
                            }}
                                       placeholder='Interesting course' value={this.state.name}
                                       onChangeText={input => this.setState({name: input})}/>
                        </View>
                        <View style={{flex: 1}}/>
                        <View style={{flex: 3}}>
                            <Text h4 style={text}>Exam date</Text>
                            <DatePicker
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate={this.state.date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    dateInput: {
                                        borderColor: colors.accentDark,
                                        borderWidth: 0,
                                        borderBottomColor: colors.accentDark,
                                        borderBottomWidth: 1,
                                        // color: colors.textDark
                                    },
                                    btnTextConfirm: {
                                        color: colors.accent
                                    }
                                }}
                                onDateChange={date => this.setState({date: date})}/>
                        </View>
                    </View>


                    <Card title="Subjects to study" titleStyle={{color: colors.textDark}} containerStyle={{height: '70%'}}>
                        <ScrollView style={{height: '75%'}} ref="scrollView">
                        {
                            this.state.subjects.map(this._renderListcard)
                        }
                        </ScrollView>
                        <Button size="small" style={{button: {marginTop: 10}}} title="Add subject"
                                onPress={this._addSubject}/>
                    </Card>

                    <Prompt
                        title="Subject"
                        placeholder="Chapters 1 to 3"
                        defaultValue={this.state.subjects[this.state.editSubjectIndex]}
                        visible={this.state.editSubjectIndex !== null}
                        onCancel={() => this.setState({
                            editSubjectIndex: null,
                        })}
                        onSubmit={(text) => {
                            this._updateSubject(this.state.editSubjectIndex, text);
                            this.setState({
                                editSubjectIndex: null,
                            })
                        }}/>
                </View>
                <Button title="Create schedule"/>
            </View>
        </ColorContainer>;

    _renderListcard = (subject, index) => {
        return <View key={index} style={{
            padding: 5,
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#d6d6d6'
        }}>
            <Text style={{fontSize: 20}}>{subject}</Text>

            <View style={{
                width: '20%',
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                {/*<TouchableOpacity onPress={() => this.setState({editSubjectIndex: index})}>*/}
                {/*<Ionicons name="ios-brush-outline" size={30} color={'red'}/>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity onPress={() => this._removeSubject(index)}>
                    <Ionicons name="ios-trash-outline" size={30} color={'red'}/>
                </TouchableOpacity>
            </View>
        </View>
    };



    _removeSubject = (index) =>
        this.setState(prevState => ({
            subjects: [...prevState.subjects.slice(0, index), ...prevState.subjects.slice(index + 1)]
        }));

    _addSubject = () => {
        this.setState({
            subjects: [...this.state.subjects, 'Subject ' + (this.state.subjects.length + 1)],
            editSubjectIndex: this.state.subjects.length
        }, () => setTimeout(this.refs.scrollView.scrollToEnd, 50));
    }


}


const styles = StyleSheet.create({
});