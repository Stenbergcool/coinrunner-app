import Constants from 'expo-constants';
import {AsyncStorage} from 'react-native';

const { manifest } = Constants;
const url = manifest.hostUri.split(':').shift().concat(':3000');

const coinHandler = {
    fetchCoins: async function fetchCoins() {
        const response = await fetch (`http://${url}/`)
        const data = await response.json();
        return data
    },

    /**
     *
     * @param {*} coin Object of coin that user Collects
     * inserts the ID as key and value in AsyncStorage
     */
    insertCollectedCoinInStorage: async function insertCollectedCoinInStorage(coin) {
        try {
            await AsyncStorage.setItem(
                coin._id,
                coin._id
            )
        } catch(error) {
            console.log(error)
        }
    },

    /**
     *
     * @param {*} coin Object of coin that user Collects
     * If coin not in AsyncStorage insert
     */
    checkIfCoinInAsyncStorage: async function checkIfCoinInAsyncStorage(coin) {
        try {
            const value = await AsyncStorage.getItem(coin._id);
            if (value == null) {
                insertCollectedCoinInStorage(coin)
            }
        } catch (error) {
        console.log(error)
        }
    },
}

module.exports = coinHandler;