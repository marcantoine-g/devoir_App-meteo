'use strict';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

export class PageStart extends React.Component {
	constructor(props) {
		super(props);
		
        this._loadsUserAsync();
    }


    _loadsUserAsync = async () => {
        this.props.navigation.navigate('Connect');
    }

	render() {
		return (
            <Image source={require("../assets/icon.png")} styles={styles.Image}/>
		);
	}
}

const styles = StyleSheet.create({
    Image : {
        width: 220,
        height: 90,
    }
});

