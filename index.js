import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import App from './App';
import {name as appName} from './app.json';
import {CartProvider} from './src/context/CartContext';

const Root = () => (
  <SafeAreaProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
