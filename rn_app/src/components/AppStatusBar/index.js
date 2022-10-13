import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { Colors } from "../../assets/styles"

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const AppStatusBar = ({

}) => (
    <View style={styles.statusBar}>
        <SafeAreaView>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor={Colors.statusbarColor}
                translucent={true} />
        </SafeAreaView>
    </View>
);

export default AppStatusBar;
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: Colors.statusbarColor
    }
});