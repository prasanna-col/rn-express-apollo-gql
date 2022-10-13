import { NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 0 // StatusBarManager.HEIGHT;

export const Active_Opacity = 0.85

export const App_borderRadius = 8