import {useState} from 'react';
import {Text, TextInput, View, Pressable, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {countryData} from '../../components/countryData';
import {useCart} from '../../context/CartContext';
import {styles} from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import SuccessModal from '../../components/Modal';

export default function CheckOut({route, navigation}) {
  const insets = useSafeAreaInsets();
  const {clearCart} = useCart();
  const {amount, qunatity} = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);

  const [countryList, setCountryList] = useState(countryData);
  const [stateList, setStateList] = useState([]);

  const handleSubmit = () => {
    if (!name || !phone || !address || !country || !stateName || !city) {
      setError('Please fill the * fields.');
      return;
    }

    setError('');
    setDisable(true);
    setConfirm(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setSuccessVisible(true);
    clearCart();
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingHorizontal: 12},
      ]}>
      <View
        style={[
          styles.topBar,
          {
            justifyContent: 'flex-start',
            paddingHorizontal: 0,
            justifyContent: 'flex-start',
            paddingBottom: 8,
          },
        ]}>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Icon name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text
          style={[
            styles.title,
            {marginTop: 0, marginBottom: 0, marginLeft: 20},
          ]}>
          CheckOut
        </Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          {alignContent: 'center', width: 'auto'},
        ]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 80}}>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
                fontSize: 18,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              },
            ]}>
            Delivery Details
          </Text>
          <TextInput
            value={name}
            editable={!disable}
            onChangeText={setName}
            placeholder="Name *"
            placeholderTextColor="#aaa"
            style={
              disable === false
                ? styles.input
                : [styles.input, {backgroundColor: '#fff'}]
            }
            disable={!disable}
          />
          <TextInput
            value={email}
            editable={!disable}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={
              disable === false
                ? styles.input
                : [styles.input, {backgroundColor: '#fff'}]
            }
          />
          <TextInput
            value={phone}
            editable={!disable}
            onChangeText={setPhone}
            placeholder="PhoneNo *"
            placeholderTextColor="#aaa"
            style={
              disable === false
                ? styles.input
                : [styles.input, {backgroundColor: '#fff'}]
            }
          />
          <TextInput
            value={address}
            editable={!disable}
            onChangeText={setAddress}
            placeholder="Address *"
            placeholderTextColor="#aaa"
            style={
              disable === false
                ? styles.input
                : [styles.input, {backgroundColor: '#fff'}]
            }
          />
          <DropDownPicker
            open={openCountry}
            value={country}
            items={countryList}
            setOpen={setOpenCountry}
            setValue={value => {
              setCountry(value);
              const selected = countryData.find(c => c.value === value());
              setStateList(selected ? selected.states : []);
              setStateName(null);
            }}
            placeholder="Country *"
            showArrowIcon={disable === true ? false : true}
            style={
              disable === false
                ? [styles.input, {zIndex: 100}]
                : [styles.input, {backgroundColor: '#fff'}]
            }
            placeholderStyle={{color: '#aaa'}}
            disabled={disable}
          />
          <DropDownPicker
            open={openState}
            value={stateName}
            items={stateList}
            setOpen={setOpenState}
            containerProps={{activeOpacity: 1}}
            setValue={setStateName}
            placeholder="State *"
            showArrowIcon={disable === true ? false : true}
            style={
              disable === false
                ? [styles.input, {zIndex: 100}]
                : [styles.input, {backgroundColor: '#fff'}]
            }
            placeholderStyle={{color: '#aaa'}}
            disabled={disable || !country}
          />

          <TextInput
            value={city}
            editable={!disable}
            onChangeText={setCity}
            placeholder="City *"
            placeholderTextColor="#aaa"
            style={
              disable === false
                ? styles.input
                : [styles.input, {backgroundColor: '#fff'}]
            }
          />
          {error && (
            <Text style={[styles.errorText, {fontSize: 14}]}>{error}</Text>
          )}
          {disable === false && (
            <LinearGradient
              colors={['#4A00E0', '#8E2DE2']}
              style={[styles.buttonBorder, {width: 'auto'}]}>
              <TouchableOpacity
                activeOpacity={1}
                disabled={disable}
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </KeyboardAwareScrollView>
      </View>
      {confirm === true && (
        <View style={styles.footerWrapper}>
          <LinearGradient colors={['#4A00E0', '#8E2DE2']} style={styles.footer}>
            <View style={styles.leftSection}>
              <Text style={styles.totalItems}>Total: ({qunatity} items)</Text>
              <Text style={styles.totalPrice}>₹{amount}</Text>
            </View>
            <Pressable style={styles.checkoutButton} onPress={handleSuccess}>
              <Text style={styles.checkoutText}>Confirm Order</Text>
            </Pressable>
          </LinearGradient>
        </View>
      )}
      <SuccessModal
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
      />
    </View>
  );
}
