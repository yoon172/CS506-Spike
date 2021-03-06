import React from 'react';
import {
   View,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView
} from 'react-native';
import {Button} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import {TextInput} from 'react-native-paper';


class Signup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
      }
   }

   handleChanges = (value, text) => {
      this.setState({[value]: text}, function () {
      });
   };

   async signupAttempt() {
      let response = await fetch('https://cs506spike.azurewebsites.net/api/People', {
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
      let route = this.CheckStatus(response);
      if(route) {
         this.props.navigation.navigate('login');
      }
   }
   async CheckStatus(response)
   {
      let status = response['status'];
      if(status === 200 || status === 201) {
         alert("User Created!");
         return true;
      } else {
         alert("Error while creating new user");
         return false;
      }

   }




   render() {
      return (
         <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'whitesmoke'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <KeyboardAvoidingView
                  style={{backgroundColor: 'whitesmoke', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                  behavior="padding" enabled>
                  <View
                     style={{flex: 0.5, backgroundColor: 'whitesmoke', alignItems: 'center', justifyContent: 'center'}}>
                     <Text style={styles.title}>CS506 Spike</Text>
                  </View>
                  <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                     <Icon
                        name={"adduser"}
                        color="#add8e6"
                        size={60}
                        style={{marginBottom: 25}}
                     />

                  </View>
                  <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'whitesmoke'}}>
                     <Text style={styles.subTitle}>Sign Up</Text>
                  </View>
                  <View
                     style={{flex: 0.7, backgroundColor: 'whitesmoke', alignItems: 'center', justifyContent: 'center'}}>
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
                     flexDirection: 'row',
                     backgroundColor: 'whitesmoke',
                     alignItems: 'center',
                     justifyContent: 'space-evenly',
                     width: '100%'
                  }}>
                     <Button
                        color={"purple"}
                        mode="contained"
                        size={50}
                        style={styles.addButton}
                        onPress={() => {
                           this.signupAttempt().then()
                        }}
                     >Sign Up</Button>
                     <Button
                        color={"purple"}
                        mode="contained"
                        size={50}
                        style={styles.addButton}
                        onPress={() => this.props.navigation.navigate('login')}>
                        Back to Login</Button>
                  </View>
               </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
         </View>
      );
   }
}


const styles = StyleSheet.create({
   buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20
   },
   subTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 25
   }


});

export default Signup;