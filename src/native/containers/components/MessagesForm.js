import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';

const OPACITY_ENABLED = 1.0;
const OPACITY_DISABLED = 0.2;
const FILENAME = "aukalu.mp4";

class MessageFormComponent extends Component {

  constructor() {
    super();

    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.onToggleRecord = this.onToggleRecord.bind(this);
    this.onReloadRecorder = this.onReloadRecorder.bind(this);
  }

  onMessageChange = (message) => {
    this.props.updateMessage(message);
  }

  handleButtonPress = (isBot = 0) => {
    this.props.sendMessage(this.props.message, this.props.member, isBot)
      .then((response) => {
        this.props.onSendMessage();
        if(this.props.watsonResponse != ""){
          if(!this.props.watsonResponse.error){
            console.log(this.props.watsonResponse);
            if(this.props.watsonResponse.message.intents.length){
              if(this.props.watsonResponse.message.intents[0].intent === "SALUDO"){
                setTimeout(()=> {
                  this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                  .then((response) => {
                    this.props.onSendMessage();
                  }).catch((err) => { console.log("err", err); });
                }, 500);
              }
            } else if( this.props.watsonResponse.message.output.nodes_visited.length){
              if(this.props.watsonResponse.message.output.nodes_visited[0] === "En otras cosas"){
                setTimeout(()=> {
                  this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                  .then((response) => {
                    this.props.onSendMessage();
                  }).catch((err) => { console.log("err", err); });
                }, 500);
              }
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillMount() {
    this.recorder = null;
    this.onReloadRecorder();
  }

  onReloadRecorder = () => {
     if (this.recorder) {
       this.recorder.destroy();
     }

     this.recorder = new Recorder(FILENAME, {
       bitrate: 128000,
       channels: 1,
       sampleRate: 44100,
       quality: 'high',
       format: 'mp4'
     });
   }

   onToggleRecord = (isBot = 0) => {
     if(this.recorder && this.recorder.isRecording){
       this.recorder.stop((err) => {
         this.props.setRecordingStatus();
         if(err){
             return;
         } else {
           this.props.uploadAudio(this.recorder.fsPath)
             .then((response) => {
               if(this.props.audionName != ""){
                 //NO ENTIENDO -> 5aeb2d08e4f9aaudio.pcm / REAL -> this.props.audionName / SALUDO -> 5aec6a2628761audio.pcm / AGREGAR ->  / REDIRECCIONAR ->
                 this.props.onSendMessageAsAudio(this.props.audionName, this.props.member, isBot)
                   .then((response) => {
                     this.props.onSendMessage();
                     if(this.props.watsonResponse != ""){
                       if(!this.props.watsonResponse.error){
                         console.log(this.props.watsonResponse);
                         //debugger;
                         if(this.props.watsonResponse.message.intents.length){
                           if(this.props.watsonResponse.message.intents[0].intent === "SALUDO"){
                             setTimeout(()=> {
                               this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                               .then((response) => {
                                 this.props.onSendMessage();
                               }).catch((err) => { console.log("err", err); });
                             }, 500);
                           }
                         } else if( this.props.watsonResponse.message.output.nodes_visited.length){
                           if(this.props.watsonResponse.message.output.nodes_visited[0] === "En otras cosas"){
                             setTimeout(()=> {
                               this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                               .then((response) => {
                                 this.props.onSendMessage();
                               }).catch((err) => { console.log("err", err); });
                             }, 500);
                           }
                         }
                       }
                     }
                   }). catch((err) => {
                     console.log("err -> ", err);
                   });
               }
             }).catch((err) => {
               console.log("err -> ", err);
             });
         }
         this.recorder.destroy();
       });
     } else {
       this.recorder = new Recorder(FILENAME, {
         bitrate: 128000,
         channels: 1,
         sampleRate: 44100,
         quality: 'high',
         format: 'mp4'
       }).prepare(() => {
         console.log(this.recorder);
       })
       .record();
       this.props.setRecordingStatus(true);
     }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.sendingError && this.props.sendingError) {
      Alert.alert('Error', this.props.sendingError)
    }
  }

  render() {
    const { sending = false, recording } = this.props;
    const isButtonDisabled = sending || this.props.message.trim().length == 0;
    const opacity = isButtonDisabled ? OPACITY_DISABLED : OPACITY_ENABLED;
    const opacityRecorder = recording ? OPACITY_DISABLED : OPACITY_ENABLED;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={'Escribe un mensaje'}
          returnKeyType='send'
          onChangeText={(text) => {
            this.onMessageChange(text);
          }}
          value={this.props.message}
          underlineColorAndroid={'transparent'}
          editable={!sending} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleButtonPress();
            }}
            disabled={isButtonDisabled}>
            <Image
              source={require('../../../images/ic_send.png')}
              style={{opacity: opacity}} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onToggleRecord();
            }}>

            <Image
              source={require('../../../images/recorder.png')}
              style={{opacity: opacityRecorder}} />

          </TouchableOpacity>
      </View>
    );
  }
}

MessageFormComponent.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    backgroundColor: '#eeeeee',
    borderTopColor: '#cccccc',
    borderTopWidth: 1
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3
  },
  button: {
    flexShrink: 0,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent:'center'
  }
})

export default MessageFormComponent
