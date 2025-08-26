import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const Landing: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello World</Text>
		</View>
	);
};

const styles = StyleSheet.create(() => ({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	text: {
		color: 'black',
		fontSize: 30,
	},
}));

export default Landing;
