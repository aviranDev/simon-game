import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';
import {
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  Colors,
  StyledTextInput,
} from './formStyles';

//Colors
const {brand} = Colors;

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  error,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <LeftIcon>
        <Icon name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput
        autoCorrect={false}
        borderColor={isFocused && '#fff'}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        {...props}
      />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Icons
            style={styles.eye}
            name={hidePassword ? 'eye-with-line' : 'eye'}
            size={30}
          />
        </RightIcon>
      )}
      {error && <Text style={styles.errors}>{error}</Text>}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  eye: {
    color: '#FFFFFF',
  },
  errors: {
    color: '#CD1F00',
  },
});
