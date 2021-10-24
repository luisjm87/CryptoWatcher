import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'

const CryptoItem = ({ crypto }) => {
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: crypto.image }}
				/>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{crypto.name}</Text>
					<Text style={styles.abv}>{crypto.symbol}</Text>
				</View>
			</View>
			<View>
				<Text style={[styles.alignRight,
					styles.text]}>€ {crypto.current_price}</Text>
				<Text style={[styles.alignRight,
				crypto.price_change_percentage_24h > 0 ?
					styles.positivePrice :
					styles.negativePrice]}>{crypto.price_change_percentage_24h.toFixed(2)} %</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		backgroundColor: '#121212',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		color: '#ffff'
	},
	image: {
		height: 30,
		width: 30
	},
	abv: {
		color: '#404040',
		textTransform: 'uppercase'
	},
	textContainer: {
		marginLeft: 10
	},
	positivePrice: {
		color: '#4eaf0a'
	},
	negativePrice: {
		color: '#e15241'
	},
	alignRight: {
		textAlign: 'right'
	}
})

export default CryptoItem
