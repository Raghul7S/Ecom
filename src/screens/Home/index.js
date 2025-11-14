import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {products} from '../../components/products';
import {useCart} from '../../context/CartContext';

import {styles} from '../styles';

export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});
  const insets = useSafeAreaInsets();
  const {cartItems, addToCart, removeFromCart} = useCart();

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderProduct = ({item}) => {
    const cartItem = cartItems.find(ci => ci.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.productImg} />
        <View style={styles.productDetails}>
          <>
            <Text style={styles.details}>{item.name}</Text>
            <Text style={styles.details}>₹{item.price}</Text>
          </>
          <>
            {quantity > 0 ? (
              <View style={styles.addCart}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => removeFromCart(item.id)}>
                  <Text
                    style={[
                      styles.quantityController,
                      {paddingHorizontal: 14},
                    ]}>
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
            ) : item.stock === 0 ? (
              <Text style={styles.noStock}>Out of Sotck</Text>
            ) : (
              <Pressable
                onPress={() => addToCart(item)}
                style={styles.addCartText}>
                <Text style={{color: '#000'}}>Add to Cart</Text>
              </Pressable>
            )}
          </>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#555" />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#ccc"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.bagButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.9}>
          <Icon name="shopping-cart" size={24} color="#000" />
          {totalQuantity > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.title,
          {
            marginTop: 5,
            fontSize: 20,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            paddingBottom: 6,
          },
        ]}>
        Product List
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 0, marginHorizontal: 0}}>
        {Object.keys(productsByCategory).map(category => (
          <View key={category} style={styles.products}>
            <Text style={styles.category}>{category}</Text>
            <FlatList
              data={productsByCategory[category]}
              keyExtractor={item => item.id.toString()}
              renderItem={renderProduct}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
