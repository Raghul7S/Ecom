import {View, Text, FlatList, Image, Pressable, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import {useCart} from '../../context/CartContext';
import {styles} from '../styles';

export default function Cart({navigation}) {
  const insets = useSafeAreaInsets();
  const {cartItems, addToCart, removeFromCart, clearCart} = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    navigation.navigate('CheckOut', {
      amount: totalAmount,
      quantity: totalQuantity,
    });
  };

  const renderItem = ({item}) => {
    const cartItem = cartItems.find(ci => ci.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    return (
      <View style={styles.cartItem}>
        <View>
          <Image
            source={{uri: item.image}}
            style={[styles.productImg, {width: 100, height: 100}]}
          />
        </View>
        <View style={styles.cartDetail}>
          <Text style={[styles.details, {fontSize: 18, fontWeight: 700}]}>
            {item.name}
          </Text>
          <Text style={[styles.details, {fontSize: 18, fontWeight: 700}]}>
            ₹{item.price}
          </Text>
          <View style={[styles.addCart, {gap: 20}]}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => removeFromCart(item.id)}>
              <Text
                style={[styles.quantityController, {paddingHorizontal: 14}]}>
                -
              </Text>
            </Pressable>
            <Text style={{color: '#000', fontWeight: 900}}>{quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => addToCart(item)}>
              <Text style={styles.quantityController}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingHorizontal: 16},
      ]}>
      <View
        style={[
          styles.topBar,
          {
            justifyContent: 'flex-start',
            paddingHorizontal: 0,
            justifyContent: 'space-between',
            paddingBottom: 8,
          },
        ]}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text style={[styles.title, {marginTop: 0, marginBottom: 0}]}>
          Your Cart
        </Text>
        {cartItems.length > 0 && (
          <Pressable onPress={() => clearCart()}>
            <Cross name="cross" size={34} color="red" />
          </Pressable>
        )}
      </View>
      {cartItems.length > 0 ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 120}}>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          </ScrollView>
          <View style={styles.footerWrapper}>
            <LinearGradient
              colors={['#4A00E0', '#8E2DE2']}
              style={styles.footer}>
              <View style={styles.leftSection}>
                <Text style={styles.totalItems}>
                  Total: ({totalQuantity} items)
                </Text>
                <Text style={styles.totalPrice}>₹{totalAmount}</Text>
              </View>

              <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Proceed To Checkout</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </>
      ) : (
        <View style={styles.centerItems}>
          <Text style={styles.emptyCart}>Your Cart is Empty</Text>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <CartIcon name="cart-arrow-down" color="#000" size={100} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
