import { createTheme } from "@mui/material"


export const theme  = createTheme({
    palette:{
        primary:{
            main: "#52AC56",
            lightGreen: '#c8facd',
            grey: '#637381',
            lightGrey: "#F2F3F5",
            black: '#000000',
            white: '#ffffff',
            darkGreen: '#15803d'
        },
        secondary:{
            main: "#637381"
        },
        other:{
            main: "#637381"
        },

    },
    border:{
        auth: "20px",
        regular: "10px",
        min: '5px',
    },
    fonts:{
        small: '15px',
        medium: '20px',
        large: "45px",
        iconFont:'18px',
        sl: '34px',
    }
});