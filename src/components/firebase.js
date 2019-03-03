import app from 'firebase/app';//The app variable represents the firebase application.

//We have to import auth and firestore to use the features.
import 'firebase/auth';
import 'firebase/firebase-firestore';

//For firebase config setting, you should use your own application's information.
const config = {
    apiKey: "AIzaSyCSKfi2ludpSaOyVn58RbGpwW9Nf3rhxDk",
    authDomain: "react-hooks-firebase-material.firebaseapp.com",
    databaseURL: "https://react-hooks-firebase-material.firebaseio.com",
    projectId: "react-hooks-firebase-material",
    storageBucket: "react-hooks-firebase-material.appspot.com",
    messagingSenderId: "368506686883"
  };

class Firebase{

    constructor(){

        app.initializeApp(config)//Let config information initialize firebase
        //With this.auth and this.db variables we can access auth and firestore
        this.auth=app.auth()
        this.db=app.firestore()
    }

    login(email,pass){
        //firebase login function
        return this.auth.signInWithEmailAndPassword(email,pass)
    }

    logout(){
        //firebase logout function
        return this.auth.signOut()
    }

    async register(name,email,pass){
        //firebase register function
        await this.auth.createUserWithEmailAndPassword(email,pass)
        //We've updated the username of the register result.
        return this.auth.currentUser.updateProfile({
            displayName:name
        })
    }

    addFruit(fruit){
        //user presence control
        if(!this.auth.currentUser){
            return alert('Not authorized')
        }

        //Adding documents to the collection of pckurdu
        return this.db.doc(`pckurdu/${this.auth.currentUser.uid}`).set({
            fruit:fruit
        })
    }

    isInitialized(){
        //hold until the process ends
        return new Promise(resolve=>{
            //firebase notifies status change
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        //return displayName if user is logged in
		return this.auth.currentUser && this.auth.currentUser.displayName
    }   

    async getCurrentUserFruit() {
        //Access to the fruit field in the user uid document in the pckurdu collection.
        const fruit = await this.db.doc(`pckurdu/${this.auth.currentUser.uid}`).get()
        //export data
		return fruit.get('fruit')
    }
}

export default new Firebase()
