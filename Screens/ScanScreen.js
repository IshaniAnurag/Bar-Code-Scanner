import * as React from 'react'
import {View,Text,Button,TouchableOpacity,StyleSheet,Image} from 'react-native'
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
      //async function for camera permission
      getCameraPermissions= async(ID)=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA);
    
        //setting state if the permissions are granted
    this.setState({
        hasCameraPermissions: status==="granted",
        scanned:false,
        buttonState:'clicked'
    });}

    //handling data using this function
    handleBarCodeScanner = async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
    
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const buttonState=this.state.buttonState;
        const scanned = this.state.scanned;

        //conditional statement for carrying out the work further
        if(buttonState==='clicked'&& hasCameraPermissions){
        return(
        
            //Bar Code scanner tag user for handling the data
            <BarCodeScanner
             onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
             style={styles.absoluteFillObject} /> ); }
              else if (buttonState === "normal"){
                   return( <View style={styles.container}>
                       <View style={{width:20,height:20}}><Image source={require("../assets/scannerImage")}></Image></View> 
                   <Text style={styles.displayText}>
                       { hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission" }</Text>
                        <TouchableOpacity onPress={this.getCameraPermissions}
                         style={styles.scanButton}> 
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                        </TouchableOpacity>
                        </View>

        )
    }
}
}

const styles=StyleSheet.create({

    submitButton:{
        border:'solid',
        borderColor:'yellow',
        textAlign:'center',
        textColor:'black'
    },
    inputBox:{
borderColor:'black',
fontSize:'20',
backgroundColor:'pink'
    },

    textStyle:{
        fontSize:20,
        fontStyle:'cursive',
        backgroundColor:'yellow',
        border:'solid',
        borderColor:'blue'
    },
    container:{
        backgroundColor:'yellow',
        borderColor:'black',
        border:'solid'
    },
    scanButton:{
        color:'Pink',
        borderColor:'purple'
    },
    displayText:{
        fontSize:20,
        fontColor:'Black'
    },
    buttonText:{
        fontSize:20,
        fontColor:'Green'
    }
})
