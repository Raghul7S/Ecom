import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {styles} from '../styles';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isValid = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError('Email and password are required');
      return false;
    } else {
      setError('');
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    } else {
      setError('');
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    } else {
      setError('');
    }

    return true;
  };

  const handleLogin = () => {
    if (isValid(email, password)) {
      navigation.replace('Home', {userName: email.split('@')[0]});
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <LinearGradient colors={['#5f9bf5ff', '#8E2DE2']} style={styles.header}>
        <Image
          source={require('../../assets/images/tick.png')}
          style={{width: '20%', height: '20%'}}
        />
        <Text style={styles.logo}>MOFINOW</Text>
      </LinearGradient>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.passwordContainer}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.options}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{false: '#ccc', true: '#8E2DE2'}}
          />
          <Text style={styles.remember}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forget}>Forget password?</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#4A00E0', '#8E2DE2']}
        style={styles.buttonBorder}>
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={1}
          style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.signupText}>
        New user? <Text style={styles.signupLink}>Sign Up</Text>
      </Text>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.socialContainer}>
        {['twitter', 'linkedin', 'facebook-square', 'google'].map((icon, i) => (
          <LinearGradient
            colors={['#4A00E0', '#8E2DE2']}
            key={i}
            style={styles.iconBg}>
            <FontAwesome name={icon} size={22} color="#fff" />
          </LinearGradient>
        ))}
      </View>
      <Text style={styles.bottomText}>Sign in with another account</Text>
    </View>
  );
}
