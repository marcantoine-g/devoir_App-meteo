'use strict';
import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

export class PageDetails extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            meteoData: this.props.navigation.getParam('meteoData', null)
        }
    };
    



	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>La Météo de {this.state.meteoData[0].city}</Text>
                <Image source={{uri: this.state.meteoData[0].icon}} style={{ width: 50, height: 50 }} />
                <Text style={styles.text}>{this.state.meteoData[0].main}</Text>
                <Text style={styles.text}>{this.state.meteoData[0].description}</Text>
                <Text style={styles.text}>{this.state.meteoData[0].temp} °F</Text>
				<Text style={styles.text}> Dans les prochains jours : </Text>
				<ScrollView>

					<Text>Dans {this.state.meteoData[1].day} jours</Text>
					<Image source={{uri: this.state.meteoData[1].icon}} style={{ width: 50, height: 50 }} />
					<Text style={styles.text}>{this.state.meteoData[1].main}</Text>
					<Text style={styles.text}>{this.state.meteoData[1].description}</Text>
					<Text style={styles.text}>{this.state.meteoData[1].temp} °F</Text>
					
					<Text>Dans {this.state.meteoData[2].day} jours</Text>
					<Image source={{uri: this.state.meteoData[2].icon}} style={{ width: 50, height: 50 }} />
					<Text style={styles.text}>{this.state.meteoData[2].main}</Text>
					<Text style={styles.text}>{this.state.meteoData[2].description}</Text>
					<Text style={styles.text}>{this.state.meteoData[2].temp} °F</Text>

					<Text>Dans {this.state.meteoData[3].day} jours</Text>
					<Image source={{uri: this.state.meteoData[3].icon}} style={{ width: 50, height: 50 }} />
					<Text style={styles.text}>{this.state.meteoData[3].main}</Text>
					<Text style={styles.text}>{this.state.meteoData[3].description}</Text>
					<Text style={styles.text}>{this.state.meteoData[3].temp} °F</Text>

					<Text>Dans {this.state.meteoData[4].day} jours</Text>
					<Image source={{uri: this.state.meteoData[4].icon}} style={{ width: 50, height: 50 }} />
					<Text style={styles.text}>{this.state.meteoData[4].main}</Text>
					<Text style={styles.text}>{this.state.meteoData[4].description}</Text>
					<Text style={styles.text}>{this.state.meteoData[4].temp} °F</Text>

				</ScrollView>
				<Button title="Back" onPress={()=>this.props.navigation.goBack(null)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20
	},
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

