import React from 'react';
import {Modal, View, Text, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

export default function SuccessModal({visible, onClose}) {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Icon
            name="celebration"
            size={100}
            color="#000"
            style={{marginBottom: 10}}
          />

          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.desc}>
            Your order has been placed successfully 🎉
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
