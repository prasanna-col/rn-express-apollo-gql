import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from "../../assets/styles"
import { Active_Opacity, App_borderRadius } from '../AppConstants';

const AppButton = ({
    title,
    onPress,
    done
}) => (
    <TouchableOpacity
        activeOpacity={Active_Opacity}
        onPress={onPress}
        style={[styles.Btn, styles.boxShadow, { width: done ? 60 : "100%" }]}
    >
        <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
);

export default AppButton;

const styles = StyleSheet.create({
    Btn: {
        height: 30,
        borderRadius: App_borderRadius,
        backgroundColor: Colors.AppColor,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    titleStyle: {
        color: Colors.white,
        fontWeight: "bold"
    },
    boxShadow: {
        marginBottom: 1,
        padding: 4,
        shadowColor: Colors.AppColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
});