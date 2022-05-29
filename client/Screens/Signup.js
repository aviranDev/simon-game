import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {signup} from '../services/user';
import Loader from '../components/Form/Loader';
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

const Signup = ({navigation}) => {
  const [register, setRegister] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  //passwords
  const [hidePassword, setHidePassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!register.email) {
      valid = false;
      handleError('Please input email', 'email');
    } else if (!register.email.match(/\S+@\S+\.\S+/)) {
      valid = false;
      handleError('Please input valid email', 'email');
    }

    if (!register.nickname) {
      valid = false;
      handleError('Please input nickname', 'nickname');
    } else if (register.nickname.length < 2) {
      valid = false;
      handleError('Nickname must be at least 2 characters long', 'nickname');
    } else if (register.nickname.length > 255) {
      valid = false;
      handleError(
        'Nickname must be no more than 255 characters long',
        'nickname',
      );
    }

    if (!register.password) {
      valid = false;
      handleError('Please input password', 'password');
    } else if (register.password.length < 6) {
      valid = false;
      handleError('Password must be at least 6 characters long', 'password');
    } else if (register.password.length > 150) {
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
    setRegister(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        await signup(register);
        navigation.navigate('Simon Signin');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({email: error.response.data});
        }
      }
    }, 3000);
  };

  return (
    <StyledContainer>
      <Loader visible={loading} />
      <InnerContainer>
        <SubTitle>Register</SubTitle>
        <StyledFormArea>
          <MyTextInput
            label="Nickname"
            icon="person"
            placeholder="Nickname"
            placeholderTextColor={darkLight}
            error={errors.nickname}
            onFocus={() => {
              handleError(null, 'nickname');
            }}
            onChangeText={text => handleOnChange(text, 'nickname')}
          />

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
            <ButtonText>Sign up</ButtonText>
          </StyledButton>
          <Line />

          <ExtraView>
            <ExtraText>Already have an account? </ExtraText>
            <TextLink onPress={() => navigation.navigate('Simon Signin')}>
              <ExtraText>Sign in</ExtraText>
            </TextLink>
          </ExtraView>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signup;
