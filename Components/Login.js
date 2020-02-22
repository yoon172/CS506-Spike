import React from 'react';
import {
   View,
   StyleSheet,
   Text,
   Keyboard,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   AsyncStorage,
} from 'react-native';
import IconRun from "react-native-vector-icons/FontAwesome5";
import IconFood from "react-native-vector-icons/MaterialCommunityIcons";
import {TextInput, Button} from "react-native-paper";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: ''
      };

   }

   handleChanges = (value, text) => {
      this.setState({[value]: text}, function () {
      });
   };

   async saveId(key, value) {
      await AsyncStorage.setItem(key, value);
   }

      async loginAttempt() {
         let response = await fetch('https://cs506spike.azurewebsites.net/api/Login', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username: this.state.username,
               password: this.state.password,
            }),
         });
         console.log(response);
         let route = this.CheckStatus(response);

      }
            async CheckStatus(response)
            {
               let isValid = false;
               let status = response['status'];
               if(status === 200 || status === 201) {
                  isValid = true;
               } else {
                  alert("Incorrect Username or Password");
                  return false;
               }
               let data = await response.json();
               console.log(data);
               if(isValid) {
                  let responseObj = data[0];
                  for (let [key, value] of Object.entries(responseObj)) {
                     if (key === 'id') {
                        this.saveId('id', value.toString());
                     }
                  }
                  this.props.navigation.navigate('Dashboard');
               }
               return true;
            }
            
   render() {

      return (

         <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                                     behavior="padding" enabled>
                  <View style={{flex: 1.0, alignItems: 'center', justifyContent: 'center'}}>
                     <Text style={styles.title}>CS506 Spike</Text>
                  </View>
                  <View style={{flex: 1.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                     <IconRun
                        name={"database"}
                        color="#add8e6"
                        size={60}
                        style={{marginBottom: 25}}
                     />
                     <IconFood
                        name={"laptop"}
                        color="#DB7093"
                        size={60}
                        style={{marginLeft: 10, marginBottom: 25}}
                     />
                  </View>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                     <Text style={styles.subTitle}>Login</Text>
                  </View>
                  <View style={{flex: 2.0, alignItems: 'center', justifyContent: 'center'}}>
                     <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text style={{marginRight: 30, marginTop: 10}}>Username: </Text>
                        <TextInput
                           style={{height: 40, width: 170, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={text => this.handleChanges("username", text)}
                           placeholder='Write Here'
                        />
                     </View>

                     <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                        <Text style={{marginRight: 32, marginTop: 10}}>Password: </Text>
                        <TextInput
                           style={{height: 40, width: 170, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={text => this.handleChanges("password", text)}
                           placeholder='Write Here'
                           secureTextEntry={true}
                        />
                     </View>
                  </View>

                  <View style={{
                     flex: 1.5,
                     flexDirection: 'column',
                     backgroundColor: 'white',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '100%',
                     marginBottom: 80,
                  }}>
                     <Button
                         color={"purple"}
                         mode="contained"
                         size={50}
                         style={styles.addButton}
                         onPress={() => this.loginAttempt()}
                     >Login</Button>
                     <Text style={{marginTop: 90, color: 'blue', textDecorationLine: 'underline'}}
                           onPress={() => this.props.navigation.navigate('signUp')}
                           underlayColor={'red'}>
                        Don't have an account? Sign up!</Text>
                  </View>
               </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
         </View>

      );
   }
}


const styles = StyleSheet.create({
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20
   },
   subTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 25
   },
   addButton: {
      alignSelf: 'center',
      position: 'absolute',

   }
});

export default Login;