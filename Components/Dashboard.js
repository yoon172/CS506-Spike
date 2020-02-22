import React from "react";
import {
   AsyncStorage,
   KeyboardAvoidingView,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   TextInput
} from "react-native";
import Header from "./Header";
import {DataTable, Avatar, Card, Title, Paragraph, Button,} from 'react-native-paper';

class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         behavior: 'padding',
         token: '',
         text:'',
      };

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

   handleChanges = (value, text) => {
      this.setState({[value]: text}, function () {
      });
   };

   async SaveAttempt() {
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
            description: this.state.text
         }),
      });
      this.CheckSaveStatus(response);
   }

   async CheckSaveStatus(response) {
      let status = response['status'];
      if (status === 200 || status === 201)
      {
         alert("Text Saved!")
      }
      else
      {
         alert("Error while saving text");
      }

   }

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
            if (key === 'description') {
               this.setState({text: value}, function () {
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
         <>
            <View style={{flex: 1, flexDirection: 'column'}}>
            <Header navigation={this.props.navigation} title={"About Me"}/>
            <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
               <SafeAreaView style={styles.container}>
                  <ScrollView style={styles.scrollView}>
                     <View style={{backgroundColor: 'whitesmoke', flexDirection: 'column'}}>
                        <TextInput
                            multiline={true}
                            style=
                             {{
                               textAlignVertical: 'top',
                               height: Dimensions.get('window').height - 100,
                               borderColor: 'black',
                               borderWidth: 1,
                               width: Dimensions.get('window').width,
                                padding:6,
                             }}
                            onChangeText={text => this.handleChanges("text", text)}
                            value={this.state.text}
                        />
                     </View>

                     <Button
                         color={"purple"}
                         mode="contained"
                         size={50}
                         style={styles.addButton}
                         onPress={() => {
                            this.SaveAttempt();
                         }}
                     >Save</Button>
                  </ScrollView>
               </SafeAreaView>
            </KeyboardAvoidingView>
            </View>


         </>
      );
   }
}

const styles = StyleSheet.create({
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10
   },
   subTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingTop: 15
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingTop: 0,
   },
   addButton: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: 10
   }

});
export default Dashboard;