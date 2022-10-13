import { StyleSheet, TextInput } from 'react-native';
import { Colors } from "../../assets/styles"

const AppTextInput = ({
    placeholder,
    defaultValue,
    onChangeText
}) => (
    <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
    />
);

export default AppTextInput;

const styles = StyleSheet.create({
    inputStyle: {
        height: 40,
        color: Colors.AppBlack2,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.AppColor,
        marginBottom: 15
    },
});