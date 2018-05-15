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
import { View, ListView, StyleSheet,Text } from 'react-native';
import Notch from '../containers/Notch';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
  });

class MyWalletDetails extends React.Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
      }

    render() {
        const { error } = this.props;
        var allItems = new Array();
        const year = new Date().getFullYear();
        allItems = ['2018','2017','2016','2015'];
        const dataIncome = this.props.incomeValues;
        const dataExpense = this.props.expenseValues;
        const colors = ["#600080", "#2556BA", "#26995F", "#99263D", "#7F9B0F", "#9E2807", "#C98704", "#33260E"];
       

            
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
                                style={{ width: undefined }}
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
                          
                        </Grid>
                    
                    <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <View><Text>{data}</Text></View>}
                        />
                   
                    </Content>
                    <Notch></Notch>
                </Container>
        )
    }

    

}


export default MyWalletDetails;
