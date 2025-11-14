import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  desc: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#8E2DE2',
    width: '60%',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
