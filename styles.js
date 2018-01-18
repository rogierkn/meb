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
    darkBackground: '#77a6f7',
    accent: '#f76c6c',
    accentDark: '#a64949',
    accentLight: '#f59d9d',
    textDark: '#363636',
    textLight: '#ffffff',
    colorContainer: '#f76c6c'
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
    // backgroundColor: colors.background,
};

export {colors, fonts, defaultContainer, text};