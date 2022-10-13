import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Active_Opacity } from '../AppConstants';
import deleteTask from "../../assets/images/deleteTask.png"
import edittask2 from "../../assets/images/edittask2.png"
import retry from "../../assets/images/retry.png"

const AppCardIcons = ({
    edittask2_icon,
    retry_icon,
    deleteTask_icon,
    onPress,
    size
}) => {
    return (
        <TouchableOpacity
            activeOpacity={Active_Opacity} onPress={onPress}>
            <Image source={
                deleteTask_icon && deleteTask ||
                edittask2_icon && edittask2 ||
                retry_icon && retry
            } style={styles.iconStyle} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconView: {
        width: "10%",
        alignItems: "center"
    },
    iconStyle: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    }
})
export default AppCardIcons;