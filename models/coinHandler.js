import Constants from 'expo-constants';

const { manifest } = Constants;
const url = manifest.hostUri.split(':').shift().concat(':3000');

const coinHandler = {
    fetchCoins: async function fetchCoins() {
        const response = await fetch (`http://${url}/`)
        const data = await response.json();
        return data
    }
}

module.exports = coinHandler;