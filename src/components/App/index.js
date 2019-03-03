import React,{useState,useEffect} from 'react';

import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
import Register from '../Register';
import Login from '../Login';

import firebase from '../firebase'

/*components required to use material-ui*/
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline,CircularProgress} from '@material-ui/core';

/*required components for routing*/
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

/*default material-ui theme generation*/
const theme=createMuiTheme()

/*It is created as a component function in the react hooks.*/
function App(props){

    //Let's use the useState object to keep the firebase state
    const [firebaseInitialized,setFirebaseInitialized]=useState(false)

    //Let's use useEffect to run the isInitialized function before the page loads.
    useEffect(()=>{

        firebase.isInitialized().then(val=>{
            setFirebaseInitialized(val)
        })
    })

    //Process of displaying components according to firebase connection result
    return firebaseInitialized!==false?(
       <MuiThemeProvider theme={theme}>
           <CssBaseline/>
           <Router>
               <Switch>
                   {/* Routing according to the path entered */}
                   <Route exact path='/' component={HomePage} />
                   <Route exact path='/register' component={Register} />
                   <Route exact path='/login' component={Login} />
                   <Route exact path='/dashboard' component={Dashboard} />
               </Switch>
           </Router>
       </MuiThemeProvider>
    ):<div id="loader"><CircularProgress/></div>
}

export default App /*we export to access other files.*/