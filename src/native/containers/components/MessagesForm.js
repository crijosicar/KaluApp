import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';
import { Actions } from 'react-native-router-flux';

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
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow  = () => {
    this.props.onKeyboardChange('Keyboard Shown');
  }

  _keyboardDidHide = () => {
    this.props.onKeyboardChange('Keyboard Hidden');
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
          if(this.props.watsonResponse.message.intents.length){
            //TOMA DE DECISIONES DE WATSON ASSISTANT
            if(this.props.watsonResponse.message.output.nodes_visited.length){
              if(this.props.watsonResponse.message.output.nodes_visited[0] === "En otras cosas"){
                setTimeout(()=> {
                  this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                  .then((response) => {
                    this.props.onSendMessage();
                  }).catch((err) => { console.log("err", err); });
                }, 500);
              } else if(this.props.watsonResponse.message.intents[0].intent === "SALUDO" ||
              this.props.watsonResponse.message.intents[0].intent === "COMO_TE_LLAMAS"){
                setTimeout(()=> {
                  this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                  .then((response) => {
                    this.props.onSendMessage();
                  }).catch((err) => { console.log("err", err); });
                }, 500);
              } else if(this.props.watsonResponse.message.intents[0].intent === "AGREGAR"){
                setTimeout(()=> {
                  this.props.addMovimiento("EGRESO", this.props.member)
                  .then(() => {
                    let numbers = [];
                    let comida = [];
                    let medidas = [];
                    if(this.props.watsonResponse.message.entities.length){
                      numbers = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "sys-number");
                      comida = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "COMIDA");
                      medidas = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "MEDIDAS");
                    }
                    let items = [];
                    let categoria = "";
                    let nombre = "";
                    let monto = 0;

                    if(medidas.length){
                      nombre = numbers[0].metadata.numeric_value + " " + medidas[0].value + " de " + comida[0].value;
                      categoria = comida[0].entity;

                      if(typeof numbers[1] !== "undefined"){
                        monto = numbers[1].metadata.numeric_value;
                      }

                      items.push({
                        categoria_activo: categoria,
                        nombre: nombre,
                        monto: monto
                      })

                    } else {
                      if(numbers.length){
                        for(let i = 0; i < numbers[0].metadata.numeric_value; i++){

                          if(typeof numbers[1] !== "undefined"){
                            monto = numbers[1].metadata.numeric_value;
                          }

                          if(comida.length){
                            categoria = comida[0].entity;
                            nombre = comida[0].value;
                          }

                          items.push({
                            categoria_activo: categoria,
                            nombre: nombre,
                            monto: monto
                          });
                        }
                      }
                    }

                    this.props.addDetalleMovimiento(this.props.transaction.id, items, this.props.member)
                    .then(() => {
                      let nombreAux = numbers[0].metadata.numeric_value + " " + nombre;
                      let haAux = "ha"
                      if(numbers[0].metadata.numeric_value > 1){
                        nombreAux + "s";
                        haAux = "han";
                      }
                      if(medidas.length){
                        nombreAux = nombre;
                      }
                      setTimeout(()=> {
                        this.props.sendMessage("se " + haAux + " agregado " + nombreAux, this.props.member, 1)
                        .then((response) => {
                          this.props.onSendMessage();
                        }).catch((err) => { console.log("err", err); });
                      }, 500);
                    })
                    .catch((err) => { console.log("err", err); });

                  }).catch((err) => { console.log("err", err); });
                }, 500);
              } else if(this.props.watsonResponse.message.intents[0].intent === "IR_A"){
                setTimeout(()=> {
                  let views = [];
                  if(this.props.watsonResponse.message.entities.length){
                    views = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "VIEWS");
                  }
                  if(views.length){
                    let viewName = views[0].value;
                    switch(viewName) {
                      case "inicio":
                      Actions.forgotPassword();
                      break;
                      case "mi cartera":
                      Actions.forgotPassword();
                      break;
                      case "reportes":
                      Actions.forgotPassword();
                      break;
                      default:
                      Actions.conversation();
                    }
                  }
                }, 500);
              }
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
                    if(this.props.watsonResponse.message.intents.length){
                      //TOMA DE DECISIONES DE WATSON ASSISTANT
                      if(this.props.watsonResponse.message.output.nodes_visited.length){
                        if(this.props.watsonResponse.message.output.nodes_visited[0] === "En otras cosas"){
                          setTimeout(()=> {
                            this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                            .then((response) => {
                              this.props.onSendMessage();
                            }).catch((err) => { console.log("err", err); });
                          }, 500);
                        } else if(this.props.watsonResponse.message.intents[0].intent === "SALUDO" ||
                        this.props.watsonResponse.message.intents[0].intent === "COMO_TE_LLAMAS"){
                          setTimeout(()=> {
                            this.props.sendMessage(this.props.watsonResponse.message.output.text[0], this.props.member, 1)
                            .then((response) => {
                              this.props.onSendMessage();
                            }).catch((err) => { console.log("err", err); });
                          }, 500);
                        } else if(this.props.watsonResponse.message.intents[0].intent === "AGREGAR"){
                          setTimeout(()=> {
                            this.props.addMovimiento("INGRESO", this.props.member)
                            .then(() => {
                              let numbers = [];
                              let comida = [];
                              let medidas = [];
                              if(this.props.watsonResponse.message.entities.length){
                                numbers = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "sys-number");
                                comida = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "COMIDA");
                                medidas = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "MEDIDAS");
                              }
                              let items = [];
                              let categoria = "";
                              let nombre = "";
                              let monto = 0;

                              if(medidas.length){
                                nombre = numbers[0].metadata.numeric_value + " " + medidas[0].value + " de " + comida[0].value;
                                categoria = comida[0].entity;

                                if(typeof numbers[1] !== "undefined"){
                                  monto = numbers[1].metadata.numeric_value;
                                }

                                items.push({
                                  categoria_activo: categoria,
                                  nombre: nombre,
                                  monto: monto
                                })

                              } else {
                                if(numbers.length){
                                  for(let i = 0; i < numbers[0].metadata.numeric_value; i++){

                                    if(typeof numbers[1] !== "undefined"){
                                      monto = numbers[1].metadata.numeric_value;
                                    }

                                    if(comida.length){
                                      categoria = comida[0].entity;
                                      nombre = comida[0].value;
                                    }

                                    items.push({
                                      categoria_activo: categoria,
                                      nombre: nombre,
                                      monto: monto
                                    });
                                  }
                                }
                              }

                              this.props.addDetalleMovimiento(this.props.transaction.id, items, this.props.member)
                              .then(() => {
                                let nombreAux = numbers[0].metadata.numeric_value + " " + nombre;
                                let haAux = "ha"
                                if(numbers[0].metadata.numeric_value > 1){
                                  nombreAux + "s";
                                  haAux = "han";
                                }
                                if(medidas.length){
                                  nombreAux = nombre;
                                }
                                setTimeout(()=> {
                                  this.props.sendMessage("se " + haAux + " agregado " + nombreAux, this.props.member, 1)
                                  .then((response) => {
                                    this.props.onSendMessage();
                                  }).catch((err) => { console.log("err", err); });
                                }, 500);
                              })
                              .catch((err) => { console.log("err", err); });

                            }).catch((err) => { console.log("err", err); });
                          }, 500);
                        } else if(this.props.watsonResponse.message.intents[0].intent === "IR_A"){
                          setTimeout(()=> {
                            let views = [];
                            if(this.props.watsonResponse.message.entities.length){
                              views = this.props.watsonResponse.message.entities.filter((entity) => entity.entity === "VIEWS");
                            }
                            if(views.length){
                              let viewName = views[0].value;
                              switch(viewName) {
                                case "inicio":
                                Actions.forgotPassword();
                                break;
                                case "mi cartera":
                                Actions.forgotPassword();
                                break;
                                case "reportes":
                                Actions.forgotPassword();
                                break;
                                default:
                                Actions.conversation();
                              }
                            }
                          }, 500);
                        }
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
