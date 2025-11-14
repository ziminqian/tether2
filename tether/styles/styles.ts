import Themes from "./theme";
import { StyleSheet } from "react-native";

export const styles = (theme: any) => StyleSheet.create({
     // for app.tsx
    container: {                                                
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.bgSecondary,
    },
    temp_msg:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
})