import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {signin} from '../services/user';
import Loader from '../components/Form/Loader';
import {useLogin} from '../context/LoginProvider';
import MyTextInput from '../components/Form/MyTextInput';
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
} from '../components/Form/formStyles';

//Colors
const {brand, darkLight} = Colors;

const Signin = ({navigation}) => {
  const {setIsLoggedIn} = useLogin();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!login.email) {
      valid = false;
      handleError('Please input email', 'email');
    } else if (!login.email.match(/\S+@\S+\.\S+/)) {
      valid = false;
      handleError('Please input valid email', 'email');
    }

    if (!login.password) {
      valid = false;
      handleError('Please input password', 'password');
    } else if (login.password.length < 6) {
      valid = false;
      handleError('Password must be at least 6 characters long', 'password');
    } else if (login.password.length > 150) {
      valid = false;
      handleError(
        'Password must be no more than 255 characters long',
        'password',
      );
    }

    if (valid) {
      handleSubmit();
    }
  };

  const handleOnChange = (text, input) => {
    setLogin(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        await signin(login);
        setIsLoggedIn(true);
        navigation.navigate('Simon game');
      } catch (error) {
        if (error.response && error.response.status >= 400) {
          setErrors({email: error.response.data});
        }
      }
    }, 3000);
  };

  return (
    <StyledContainer>
      <Loader visible={loading} />
      <InnerContainer>
        <SubTitle>Signin</SubTitle>
        <StyledFormArea>
          <MyTextInput
            label="Password"
            icon="lock"
            placeholder="* * * * * * * *"
            placeholderTextColor={darkLight}
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnChange(text, 'password')}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />

          <MyTextInput
            label="Email Address"
            icon="mail"
            placeholder="Enter gamil address"
            placeholderTextColor={darkLight}
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleOnChange(text, 'email')}
            keyboardType="email-address"
          />

          <StyledButton onPress={validate}>
            <ButtonText>Login</ButtonText>
          </StyledButton>
          <Line />

          <ExtraView>
            <ExtraText>Not registered yet? </ExtraText>
            <TextLink onPress={() => navigation.navigate('Signup')}>
              <ExtraText>Register here</ExtraText>
            </TextLink>
          </ExtraView>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signin;
