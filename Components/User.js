import React from "react";
import {
   View,
   StyleSheet,
   SafeAreaView,
   Text,
   ScrollView,
   KeyboardAvoidingView,
   Dimensions,
   AsyncStorage,
   TouchableOpacity,
   Alert
} from 'react-native';
import Header from "./Header";
import {TextInput} from 'react-native-paper';


class User extends React.Component {


   constructor(props) {
      super(props);
      this.state = {
         behavior: 'padding',
         firstname: '',
         lastname: '',
         username: '',
         password: ''
      };
   }

   logout() {
      Alert.alert(
         'Logout',
         'Would you like to Logout?',
         [
            {
               text: 'YES', onPress: () => {
                  this.logoutConfirmed().then()
               }
            },
            {text: 'NO', style: 'cancel'},
         ]
      );
   }


   async logoutConfirmed() {
      await this.removeData("id");
      this.props.navigation.navigate("login");
   }

   getData = async (key) => {
      try {
         let data = await AsyncStorage.getItem(key);
         return data;
         //this.setState({[key]: data});
      } catch (errorMessage) {
         console.log(errorMessage);
      }
   };

   removeData = async (key) => {
      try {
         await AsyncStorage.removeItem(key);
      } catch (errorMessage) {
         console.log(errorMessage);
      }
   };



   async editAttempt() {
      let id = await this.getData('id');
      let defaultUrl = 'https://cs506spike.azurewebsites.net/api/People/' + id;

      let response =  await fetch(defaultUrl, {
         method: 'PUT',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id': id
         },
         body: JSON.stringify({
            userName: this.state.username,
            password: this.state.password,
            firstName: this.state.firstname,
            lastName: this.state.lastname
         }),
      });
      this.CheckSaveStatus(response);
   }

   async CheckSaveStatus(response) {
      let status = response['status'];
      if (status === 200 || status === 201)
      {
         alert("Information Saved!")
      }
      else
      {
         alert("Error while saving information");
      }

   }

   handleChanges = (value, text) => {
      this.setState({[value]: text}, function () {
      });
   };


   async updateAPI() {

      let id = await this.getData('id');
      let defaultUrl = 'https://cs506spike.azurewebsites.net/api/People/' + id;
      let response =  await fetch(defaultUrl, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id': id
         },
      });
      this.CheckStatus(response);
   }

   async CheckStatus(response) {
      let status = response['status'];
      if (status === 200 || status === 201)
      {
         let data = await response.json();
         for (let [key, value] of Object.entries(data)) {
            if (key === 'lastName') {
               this.setState({lastname: value}, function () {
               });
            }
            else if((key === 'firstName')) {
               this.setState({firstname: value}, function () {
               });
            }
            else if((key === 'userName')) {
               this.setState({username: value}, function () {
               });
            }
            else if((key === 'passWord')) {
               this.setState({password: value}, function () {
               });
            }
         }
      }
      else
      {
         alert("Error while retrieving data");
      }

   }



   componentDidMount() {
      // On mount, do the first update
      this.updateAPI().then(); // Function that updates component from fetch
      // Subscribe that same function to focus events on the component in the future
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
         this.updateAPI().then();
      });

   }


   componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
   }

   render() {
      return (

         <View style={{flex: 1, flexDirection: 'column'}}>
            <Header navigation={this.props.navigation} title={"Edit Profile"}/>
            <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
               <SafeAreaView style={styles.container}>
                  <ScrollView style={styles.scrollView}>
                     <View style={{
                        flex: 1.2,
                        flexDirection: "row",
                        backgroundColor: 'whitesmoke',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingTop: 20,
                        paddingBottom: 20
                     }}>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                           <Text style={{color: 'white', fontWeight: 'bold'}}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyleSave} onPress={() => this.editAttempt()}>
                           <Text style={{color: 'white', fontWeight: 'bold'}}>Save Changes</Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteAccount()}>
                           <Text style={{color: 'white', fontWeight: 'bold'}}>Delete Account</Text>
                        </TouchableOpacity>*/}
                     </View>
                     <View style={{
                        flex: 0.7,
                        backgroundColor: 'whitesmoke',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop:20
                     }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                           <TextInput
                              style={{
                                 height: 60,
                                 width: Dimensions.get('window').width - 20,
                                 borderColor: 'gray',
                                 borderWidth: 1
                              }}
                              label='First Name'
                              onChangeText={text => this.handleChanges("firstname", text)}
                              value={this.state.firstname}
                           />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                           <TextInput
                              style={{
                                 height: 60,
                                 width: Dimensions.get('window').width - 20,
                                 borderColor: 'gray',
                                 borderWidth: 1
                              }}
                              label='Last Name'
                              onChangeText={text => this.handleChanges("lastname", text)}
                              value={this.state.lastname}
                           />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                           <TextInput
                              style={{
                                 height: 60,
                                 width: Dimensions.get('window').width - 20,
                                 borderColor: 'gray',
                                 borderWidth: 1
                              }}
                              label='Username'
                              onChangeText={text => this.handleChanges("username", text)}
                              value={(this.state.username).toString()}
                           />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                           <TextInput
                              style={{
                                 height: 60,
                                 width: Dimensions.get('window').width - 20,
                                 borderColor: 'gray',
                                 borderWidth: 1
                              }}
                              label='password'
                              onChangeText={text => this.handleChanges("password", text)}
                              value={(this.state.password).toString()}
                           />
                        </View>
                     </View>
                  </ScrollView>
               </SafeAreaView>
            </KeyboardAvoidingView>
         </View>

      );
   }


}


const styles = StyleSheet.create({
   buttonStyle: {
      backgroundColor: '#0800ff',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: '#190fff',
      height: 50,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginHorizontal: 3
   },
   buttonStyleSave: {
      backgroundColor: '#0800ff',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: '#190fff',
      height: 40,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginHorizontal: 2
   },
   logoutButton: {
      backgroundColor: '#ff5d00',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: '#ff6310',
      height: 40,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5
   },
   deleteButton: {
      backgroundColor: '#ff0017',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: '#ff001a',
      height: 40,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5
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
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingTop: 0,
   }
});


export default User;