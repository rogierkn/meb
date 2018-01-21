/*const colors = {
    background: '#D3e3fc',
    lightBackground: '#fff',
    darkBackground: '#47c0e6',
    accent: '#E8362C',
    accentDark: '#B9312A',
    textDark: '#363636',
    textLight: '#ffffff'
};*/

const colors = {
    background: '#f7f7f7',
    lightBackground: '#fff',
    accent: '#f76c6c',
    accentDark: '#a64949',
    accentLight: '#f59d9d',
    textDark: '#363636',
    textLight: '#ffffff',
    colorContainer: '#f76c6c',
    home: {
        background: '#f7f7f7',
        lightBackground: '#fff',
        accent: '#a8d0e6',
        accentDark: '#7ec1e6',
        accentLight: '#bde8ff',
        textDark: '#363636',
        textLight: '#ffffff',
        colorContainer: '#a8d0e6',
    },
    newExam: {
        background: '#f7f7f7',
        lightBackground: '#fff',
        accent: '#f76c6c',
        accentDark: '#a64949',
        accentLight: '#f59d9d',
        textDark: '#363636',
        textLight: '#ffffff',
        colorContainer: '#f76c6c',
    },
    exams: {
        background: '#f7f7f7',
        lightBackground: '#fff',
        accent: '#77a6f7',
        accentDark: '#5172a6',
        accentLight: '#9fc0f5',
        textDark: '#363636',
        textLight: '#ffffff',
        colorContainer: '#77a6f7',
    },
    studySession: {
        background: '#f7f7f7',
        lightBackground: '#fff',
        accent: '#6cf56c',
        accentDark: '#49a649',
        accentLight: '#9ff59f',
        textDark: '#363636',
        textLight: '#ffffff',
        colorContainer: '#6cf56c',
    },
};

const fonts = {
    default: 'Arial',
    sizes: {
        button: {
            small: 12,
            medium: 20,
            big: 28
        },
        text: 14,
    },
    colors: {
        button: colors.textLight,
    }
};

const text = {
    color: colors.textLight,
    backgroundColor: 'transparent',
};

const defaultContainer = {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
};


const customColor = {};

export {colors, fonts, defaultContainer, text};