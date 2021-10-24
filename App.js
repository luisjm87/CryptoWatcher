import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, TextInput, StatusBar } from 'react-native'

import CryptoItem from "./components/CryptoItem";

const URLENPOINT = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"

const App = () => {

  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(false)

  const getDataFromAPI = async () => {
    const response = await fetch(URLENPOINT)
    const data = await response.json()
    console.log(data)
    setCryptos(data);
  }

  useEffect(() => {
    getDataFromAPI()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#151515" />
      <View style={styles.header}>
        <Text style={styles.title}>Cryptos</Text>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#404040"
          onChangeText={text => setSearch(text)}
          style={styles.search} />
      </View>
      <FlatList
        style={styles.cryptoList}
        refreshing={updating}
        onRefresh={ async () => {
          setUpdating(true)
          await getDataFromAPI()
          setUpdating(false)
        }}
        showsVerticalScrollIndicator={false}
        data={cryptos.filter((crypto) => 
          crypto.name.toLowerCase().includes(search.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item }) => {
          return <CryptoItem crypto={item} />
        }} />
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151515',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#ffff',
    fontSize: 20,
    marginTop: 10
  },
  cryptoList: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  search: {
    color: '#fff',
    borderBottomColor: '#404040',
    borderBottomWidth: 1,
    width: '40%'
  }
})

export default App
