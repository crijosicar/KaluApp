import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Picker, Item, Label, Input, Button,StyleProvider, H1, H2, H3, Icon,  Subtitle } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';
import Messages from './Messages';
import { View, FlatList, StyleSheet, Text, Platform } from 'react-native';
import Notch from '../containers/Notch';
import { Table, Row as TableRow, Rows, Col as TableCol } from 'react-native-table-component';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
// });

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

class MyWalletDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      tableHead: ['Item', 'Monto'],
      tableData: [
        ['1', '2' ],
        ['a', 'b'],
        ['1', '2'],
        ['a', 'b']
      ],
      dataSource: [],
      monthIncoming: "",
      yearIncoming: ""

    };
    this.onValueChangeMonthIncoming = this.onValueChangeMonthIncoming.bind(this);
    this.onValueChangeYearIncoming = this.onValueChangeYearIncoming.bind(this);
  }

  componentDidMount() {
    let now = new Date();
    this.props.getWalletDetailsValues(this.props.member, {categoria:"COMIDA", tipoTransaccion:"EGRESO", "mes": (now.getMonth() +  1), "anho": now.getFullYear()});
    this.setState({
      dataSource: this.props.expenseDetailsValues
    })
  }

  onValueChangeMonthIncoming = (value) => {
    this.setState({ monthIncoming: value });
    this.props.getWalletDetailsValues(this.props.member,{categoria:"COMIDA", tipoTransaccion:"EGRESO", "mes": value, "anho": this.state.yearIncoming});
    debugger;
  }

  onValueChangeYearIncoming = (value) => {
    this.setState({ yearIncoming: value });
    this.props.getWalletDetailsValues(this.props.member,{categoria:"COMIDA", tipoTransaccion:"EGRESO","mes": this.state.monthIncoming, "anho": value});
    debugger;
  }

  render() {
    const values= this.state.dataSource;
    const state = this.state;
    const { error } = this.props;
    var allItems = new Array();
    const year = new Date().getFullYear();
    allItems = ['2018','2017','2016','2015'];
    const colors = ["#600080", "#2556BA", "#26995F", "#99263D", "#7F9B0F", "#9E2807", "#C98704", "#33260E"];
    let tableRows =  [];
    let colItem=[];
    let colMonto=[];
        if(values.length!=0){
          for (var i = 0, len = values.length; i < len; i++) {
            item=values[i].activo;
            while(item.length<50){
              item=item+" ";
            }
            colItem.push(item +"          "+values[i].monto);
            colMonto.push(values[i].monto)
          }
            
          }
            tableRows = (
              <TableCol data={colItem} textStyle={styles.text}/>
             
            );
        
            
    return (
      <Container>
        <Content padder>
          <Header
            title="Detalles de Movimientos"
            content="Información Financiera"/>
          <Grid>
            <Col>
              <H3>Ingresos</H3>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <View style={{
                  flex:1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
              <Picker
                  mode="dropdown"
                  iosHeader="Seleccione..."
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  headerBackButtonText="< Volver"
                  placeholder="Mes"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                  selectedValue={this.state.monthIncoming}
                  onValueChange={this.onValueChangeMonthIncoming}>
                    <Picker.Item label="Enero" value="1" />
                    <Picker.Item label="Febrero" value="2" />
                    <Picker.Item label="Marzo" value="3" />
                    <Picker.Item label="Abril" value="4" />
                    <Picker.Item label="Mayo" value="5" />
                    <Picker.Item label="Junio" value="6" />
                    <Picker.Item label="Julio" value="7" />
                    <Picker.Item label="Agosto" value="8" />
                    <Picker.Item label="Septiembre" value="9" />
                    <Picker.Item label="Octubre" value="10" />
                    <Picker.Item label="Noviembre" value="11" />
                    <Picker.Item label="Diciembre" value="12" />
                </Picker>
              </View>
            </Col>
            <Col>
              <View style={{
                flex:1,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
              }}>
              <Picker
                  mode="dropdown"
                  iosHeader="Seleccione..."
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  headerBackButtonText="< Volver"
                  placeholder="Año"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                  selectedValue={this.state.yearIncoming}
                  onValueChange={this.onValueChangeYearIncoming}>
                        {allItems && allItems.map((anho,i) => {
                          return (
                            <Picker.Item key={i} label={anho} value={anho} />
                        )})}
              </Picker>
            </View>
            </Col>
          </Grid>
          <Grid>
            <Col>
              {/* <Text>Item                     Monto</Text>
              <FlatList
                  data={this.state.dataSource}
                  renderItem={({item}) => (
                      <Text>{item.activo} "                 " {item.monto}</Text>
                  )}
                />  */}
                <View style={styles.container}>
                  <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <TableRow data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {tableRows}
                    
                  </Table>
                </View> 
              
            </Col>
          </Grid>
        </Content>
        <Notch></Notch>
      </Container>
    )
  }



}


export default MyWalletDetails;
