import { Text, TextProps } from './Themed';
import { TouchableOpacity } from 'react-native';

export function MonoText({ style, font="regular", ...otherProps }: TextProps) {
  return <Text {...otherProps} style={[style, { fontFamily: font }]} />;
}

export function StyledButton(props) {
  return <TouchableOpacity style={[ props.style, { borderRadius: 25 }, {backgroundColor:"#32c8db"}, {padding:10}, {margin:10} ]}>
    <Text {...props} style={[ { fontFamily:"ultra" }, { color: "#1c1b21" } ]}></Text>
  </TouchableOpacity>
}
