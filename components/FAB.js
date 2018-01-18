import React from "react";
import {Text, TouchableHighlight, TouchableOpacity} from "react-native";
import {colors, fonts} from "../styles";
import {Ionicons} from "@expo/vector-icons/index";

const defaultButtonStyle = {
    width: 50,
    height: 50,
    // padding: 10,

    backgroundColor: colors.accent,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    // textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 25,

};
const defaultButtonTextStyle = {
    color: colors.accent,
    fontWeight: '300',
    textAlign: 'center'
};


const FAB = ({onPress, title, style = {button:{}, text:{}}, size = 'medium'}) => {

    const buttonStyle = {...defaultButtonStyle, ...style.button};
    const textStyle = {...defaultButtonTextStyle, ...style.text, fontSize: fonts.sizes.button[size]};


    return <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Ionicons name="ios-add-outline" size={30} color={colors.textLight}/>
    </TouchableOpacity>
};


export {
    FAB
}