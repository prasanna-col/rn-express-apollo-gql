import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, LINEHEIGHT, MARGINS, SIZES } from "../../assets/styles";

export default function AppText(props) {
    const {
        children,
        numberOfLines,
        adjustsFontSizeToFit,
        onPress
    } = props;

    const textStyles = [
        styles.default,
        props.small && styles.small,
        props.h1 && styles.h1,
        props.h2 && styles.h2,
        props.h3 && styles.h3,
        props.h3m && styles.h3m,
        props.h2m && styles.h2m,
        props.mb1 && styles.mb1,
        props.mb2 && styles.mb2,
        props.mb3 && styles.mb3,
        props.mb4 && styles.mb4,
        props.mt1 && styles.mt1,
        props.mt2 && styles.mt2,
        props.mt3 && styles.mt3,
        props.mt4 && styles.mt4,
        props.ml1 && styles.ml1,
        props.ml2 && styles.ml2,
        props.ml3 && styles.ml3,
        props.ml4 && styles.ml4,
        props.gray && styles.gray,
        props.green && styles.green,
        props.blue && styles.blue,
        props.AppBlack && styles.AppBlack,
        props.AppBlack2 && styles.AppBlack2,
        props.InkBlue && styles.InkBlue,
        props.flex && styles.flex,
        props.black && styles.black,
        props.white && styles.white,
        props.bold && styles.bold,
        props.underline && styles.underline,
        props.semibold && styles.semibold,
        props.textAlignCenter && styles.textAlignCenter,
        props.textAlignRight && styles.textAlignRight,
        props.center && styles.center,
        props.lineHeight && styles.lineHeight,
        props.error && styles.error,
        props.italic && styles.italic,
        props.underline && styles.underline,
        props.strike && styles.strike,
        props.style,
    ];

    return (
        <Text
            onPress={onPress}
            style={textStyles}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    strike: {
        textDecorationLine: 'line-through'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    italic: {
        fontStyle: 'italic'
    },
    black: {
        color: Colors.black,
    },
    gray: {
        color: Colors.gray
    },
    AppBlack: {
        color: Colors.AppBlack,
    },
    AppBlack2: {
        color: Colors.AppBlack2
    },
    bold: {
        fontWeight: "700",
    },
    center: {
        textAlign: "center",
    },
    default: {
        color: Colors.AppText,
        fontSize: SIZES.body,
        lineHeight: LINEHEIGHT.body,
    },
    error: {
        color: Colors.errorRed,
    },
    flex: {
        flex: 1,
    },

    h1: {
        fontSize: SIZES.h1,
        lineHeight: LINEHEIGHT.h1,
    },
    h2: {
        fontSize: SIZES.h2,
        lineHeight: LINEHEIGHT.h2,
    },
    h2m: {
        fontSize: SIZES.h2m,
        lineHeight: LINEHEIGHT.h2m,
    },
    h3: {
        fontSize: SIZES.h3,
        lineHeight: LINEHEIGHT.h3,
    },
    h3m: {
        fontSize: SIZES.h3m,
        lineHeight: LINEHEIGHT.h3m,
    },

    mb1: {
        marginBottom: MARGINS.mb1,
    },
    mb2: {
        marginBottom: MARGINS.mb2,
    },
    mb3: {
        marginBottom: MARGINS.mb3,
    },
    mb4: {
        marginBottom: MARGINS.mb4,
    },
    mt1: {
        marginTop: MARGINS.mb1,
    },
    mt2: {
        marginTop: MARGINS.mb2,
    },
    mt3: {
        marginTop: MARGINS.mb3,
    },
    mt4: {
        marginTop: MARGINS.mb4,
    },
    ml1: {
        marginLeft: MARGINS.mb1
    },
    ml2: {
        marginLeft: MARGINS.mb2
    },
    ml3: {
        marginLeft: MARGINS.mb3
    },
    ml4: {
        marginLeft: MARGINS.mb4
    },
    semibold: {
        fontWeight: "500",
    },
    small: {
        fontSize: SIZES.small,
        lineHeight: LINEHEIGHT.small,
    },
    textAlignCenter: {
        textAlign: "center",
    },
    textAlignRight: {
        textAlign: "right",
    },
    underline: {
        textDecorationLine: "underline",
    },
    white: {
        color: Colors.white,
    },
});
