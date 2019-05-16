import firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry, View, Text, Button, StyleSheet
} from 'react-native';
import { name as appName } from './app.json';

const styles = StyleSheet.create({
  boxTexto: {
    padding: 15,
    textAlign: 'center'
  },
  descricao: {
    fontSize: 25
  },
  numero: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  boxButton: {
    paddingLeft: 30,
    paddingRight: 30
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { valorPontuacao: 0 };
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: '<API_KEY>',
      authDomain: '<PROJECT_ID>.firebaseapp.com',
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
      projectId: '<PROJECT_ID>',
      storageBucket: '<BUCKET>.appspot.com',
      messagingSenderId: '<SENDER_ID>'
    };

    firebase.initializeApp(firebaseConfig);

    const pontuacao = firebase.database().ref('pontuacao');
    pontuacao.on('value', (snapshot) => {
      const valorPontuacao = snapshot.val();
      this.setState({ valorPontuacao });
    });
  }

  salvarDados() {
    const pontuacao = firebase.database().ref('pontuacao');
    pontuacao.set('0');
  }

  render() {
    const { valorPontuacao } = this.state;

    return (
      <View>
        <Text style={styles.boxTexto}>
          <Text style={styles.descricao}>Pontuacao:</Text>
          <Text style={styles.numero}>{valorPontuacao}</Text>
        </Text>
        <View style={styles.boxButton}>
          <Button
            style={styles.botao}
            onPress={() => {
              this.salvarDados();
            }}
            title="Resetar pontuacao para 0"
            color="#841584"
            accessibilityLabel="Resetar pontuacao para 0"
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
