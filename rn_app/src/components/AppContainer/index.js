import React from "react";
import { StyleSheet, View } from 'react-native';

// const AppContainer = (props) => {
export default function AppContainer(props) {
    const {
        children,
        style,
    } = props

    return (
        <View
            {...props}
            style={[
                styles.container,
                props.center && styles.center,
                style
            ]}>
            {children}
        </View>
    )
}
// export default AppContainer;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },


});