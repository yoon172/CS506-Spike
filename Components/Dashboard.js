import React from "react";
import {
   AsyncStorage,
   KeyboardAvoidingView,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
   Dimensions
} from "react-native";
import Header from "./Header";
import {DataTable, Avatar, Card, Title, Paragraph} from 'react-native-paper';
import moment from "moment";

class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         behavior: 'padding',
         token: '',
      };

   }

   getData = async (key) => {
      try {
         let data = await AsyncStorage.getItem(key);
         this.setState({[key]: data});
      } catch (errorMessage) {
         console.log(errorMessage);
      }
   };


   handleObject = (data) => {
      for (let [key, value] of Object.entries(data)) {
         this.setState({[key]: value});
      }
   };


/*
   async updateAPI() {


      let token = this.state.token;
      let defaultUrl = 'https://mysqlcs639.cs.wisc.edu/';
      await fetch(defaultUrl, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
         },
      })
          .then((response) => response.json())
          .then((responseData) => {
             this.handleObject(responseData);
          })
          .done();


      await this.getData("username");
      let username = this.state.username;
      let defaultUrlProfile = 'https://mysqlcs639.cs.wisc.edu/users/';
      this.setState({token: token});
      defaultUrlProfile = defaultUrlProfile + username;
      await fetch(defaultUrlProfile, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
         },
      })
          .then((response) => response.json())
          .then((responseData) => {
             this.handleObject(responseData);

          });


      let mealsUrl = 'https://mysqlcs639.cs.wisc.edu/';
      mealsUrl = mealsUrl + 'meals/';

      await fetch(mealsUrl, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
         },
      })
          .then((response) => response.json())
          .then((responseData) => {
             this.handleObject(responseData);
          });


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
*/


   render() {
      return (
         <>

            <Header navigation={this.props.navigation} title={"Dashboard"}/>
            <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
               <SafeAreaView style={styles.container}>
                  <ScrollView style={styles.scrollView}>
                     <View style={{backgroundColor: 'whitesmoke', flex: 1, flexDirection: 'column'}}>

                        <Text>Hello</Text>
                     </View>
                  </ScrollView>
               </SafeAreaView>
            </KeyboardAvoidingView>


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
   }

});
export default Dashboard;