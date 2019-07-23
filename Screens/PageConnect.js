'use strict';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

export class PageConnect extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            messageString: '',
            searchString: '',
            listeVille : ['75000', '69000' , '13000', '23000', '14000'],
            dataListe: [],
            isVisible: true
        };
        this.initSrollView();  
    }

    componentDidMount(){
        this.initSrollView();
    }

    initSrollView(){
        for (let i=0; i<5; i++){
            fetch(
                'https://api.openweathermap.org/data/2.5/forecast/daily?q='+this.state.listeVille[i]+
                '&unites=metric'+
                '&appid=6cd6492e43cd883fa81c9fc1696d358e'
            )
            .then(response=>response.json())
            .then(json=>this.afficheScrollView(json))
            .catch(error => {
                this.setState({
                    messageString : 'Une erreur s\'est produite !'
                });
            });
        }
    }

    afficheScrollView(response){
        if(response.cod == '502'){
            this.setState({
                messageString: 'Cette ville n\'existe pas !'
            });
        } else {
            this.state.dataListe.push({
                'icon' : 'https://openweathermap.org/img/w/'+ response.list[0].weather[0].icon+'.png',
                'main': response.list[0].weather[0].main,
                'city': response.city.name,
                'description': response.list[0].weather[0].description,
                'temp': response.list[0].temp.day
            });

            this.setState({
                messageString : ''
            });
        }
    }


    handleResponse(response){
        if(response.cod == '502'){
            this.setState({
                messageString: 'Cette ville n\'existe pas !'
            });
        } else {
            var meteoData = [];
            for (let i=0; i<5; i++){   
                meteoData.push({
                    'day' : i,
                    'icon' : 'https://openweathermap.org/img/w/'+ response.list[i].weather[0].icon+'.png',
                    'main': response.list[i].weather[0].main,
                    'city': response.city.name,
                    'description': response.list[i].weather[0].description,
                    'temp': response.list[i].temp.day
                });
            }
            this.setState({
                messageString : ''
            });
            this.props.navigation.navigate('Details', {meteoData: meteoData});
        }
    }

    onSearchPress (cityName) {
        fetch(
            'https://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+
            '&unites=metric'+
            '&appid=6cd6492e43cd883fa81c9fc1696d358e'
        )
        .then(response=>response.json())
        .then(json=>this.handleResponse(json))
        .catch(error => {
            this.setState({
                messageString : 'Une erreur s\'est produite !'
            });
        });
    }

	render() {
        if (this.state.dataListe[0] && this.state.dataListe[1] && this.state.dataListe[2] && this.state.dataListe[3] && this.state.dataListe[4]){
            return (
                <View style={styles.container}>
                    <Overlay 
                        isVisible={this.state.isVisible} 
                        onBackdropPress={()=>this.setState({isVisible : false})}
                        windowBackgroundColor="rgba(255, 255, 255, .5)"
                        overlayBackgroundColor="#F0F8FF"
                        width='80%'
                        height='22%'
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 20, justifyContent : 'center', alignItems: 'center', textAlign: 'center', marginBottom: 25}}>
                            Bienvenue sur mon Application Météo !
                        </Text>
                        <Button title="Fermer" type="outline" onPress={()=>this.setState({isVisible:false})} />
                    </Overlay>

                    <ImageBackground 
                    source={require('../assets/background.jpg')}
                    imageStyle={{resizeMode: 'cover'}}
                    style={styles.background}>
                        <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.buttonTop} onPress={ ()=>this.onSearchPress(this.state.dataListe[0].city) }>
                                <Text style={styles.text}>{ this.state.dataListe[0].city }</Text>
                                <Text style={styles.text}>{ this.state.dataListe[0].temp } °F</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonTop} onPress={ ()=>this.onSearchPress(this.state.dataListe[1].city) }>
                                <Text style={styles.text}>{ this.state.dataListe[1].city }</Text>
                                <Text style={styles.text}>{ this.state.dataListe[1].temp } °F</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonTop} onPress={ ()=>this.onSearchPress(this.state.dataListe[2].city) }>
                                <Text style={styles.text}>{ this.state.dataListe[2].city }</Text>
                                <Text style={styles.text}>{ this.state.dataListe[2].temp } °F</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonTop} onPress={ ()=>this.onSearchPress(this.state.dataListe[3].city) }>
                                <Text style={styles.text}>{ this.state.dataListe[3].city }</Text>
                                <Text style={styles.text}>{ this.state.dataListe[3].temp } °F</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonTop} onPress={ ()=>this.onSearchPress(this.state.dataListe[4].city) }>
                                <Text style={styles.text}>{ this.state.dataListe[4].city }</Text>
                                <Text style={styles.text}>{ this.state.dataListe[4].temp } °F</Text>
                            </TouchableOpacity>                        
                        </ScrollView>
                        <View style={styles.view}>
                        <Text style={styles.title}> Ma Méteo </Text>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Entrez un code postale ou une ville"
                            onChangeText={(searchString) => this.setState({searchString})}
                        />
                        <TouchableOpacity style={styles.button} onPress={ ()=>this.onSearchPress(this.state.searchString) }>
                            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 30}]}> Quel temps fait-il ?</Text>
                        </TouchableOpacity>
                        <Text style={styles.error}>{ this.state.messageString}</Text>
                        </View>
                    </ImageBackground>    

                </View>
            );
	    } else {
            return <Text>Loading</Text>; 
        }
    }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
        height :'auto',
        width: '80%',
        justifyContent : 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderStyle: 'solid'
    },
    text: {
        height :'auto',
        justifyContent : 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
	},
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
    },
	button: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		width: '80%',
		height: 100,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 130,
        borderRadius: 20
	},
    buttonTop : {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 20,
		width: 'auto',
        height :75,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		margin: 10
    },
    scroll : {
        flex: 0.5,
        margin: 2,
        padding : 2,
        paddingTop : 15,
    },
    background : {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height : '100%'
    },
    view: {
        alignItems: 'center',
        flex: 4,
        justifyContent: 'center'    
    },
    error: {
        fontWeight: 'bold',
        color: '#DC143C'
    }
});

