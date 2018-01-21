import React from "react";
import {Text, TouchableHighlight, TouchableOpacity} from "react-native";
import {colors, fonts} from "../styles";

const defaultButtonStyle = {
    // width: '90%',
    padding: 10,
    // backgroundColor: colors.accent,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 5
};
const defaultButtonTextStyle = {
    color: colors.accent,
    fontWeight: '300',
    textAlign: 'center'
};


const Button = ({onPress, title, style = {button:{}, text:{}}, size = 'medium', disabled = false}) => {

    const buttonStyle = {...defaultButtonStyle, ...style.button};
    const textStyle = {...defaultButtonTextStyle, ...style.text, fontSize: fonts.sizes.button[size]};


    return <TouchableOpacity style={buttonStyle} disabled={disabled} onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
};


export {
    Button
}