import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Picker, Item, Label, Input, Button,StyleProvider, H1, H2, H3, Icon, Text as Texto, Subtitle } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TSpan,
    Text
} from 'react-native-svg';
import Messages from './Messages';
import { View } from 'react-native';

class MyWallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monthIncoming: "",
            yearIncoming: "",
            monthExpenses: "",
            yearExpenses: ""
        }
        this.onValueChangeYearIncoming = this.onValueChangeYearIncoming.bind(this);
        this.onValueChangeYearExpenses = this.onValueChangeYearExpenses.bind(this);
        this.onValueChangeMonthIncoming = this.onValueChangeMonthIncoming.bind(this);
        this.onValueChangeMonthExpenses = this.onValueChangeMonthExpenses.bind(this);
    }

    componentDidMount() {
      let now = new Date();
      this.props.getPieValues(this.props.member,{month: 5, year: now.getFullYear(), tipoTransaccion:"INGRESO"});
      this.props.getPieValues(this.props.member,{month: 5, year: now.getFullYear(), tipoTransaccion:"EGRESO"});
    }

    onValueChangeMonthIncoming = (value) => {
        this.props.getPieValues(this.props.member,{month:value, year:this.state.yearIncoming, tipoTransaccion:"INGRESO"});
        this.setState({ monthIncoming: value });
    }

    onValueChangeYearIncoming = (value) => {
        this.props.getPieValues(this.props.member,{month:this.state.monthIncoming, year:value, tipoTransaccion:"INGRESO"});
        this.setState({ yearIncoming: value });
    }

    onValueChangeYearExpenses = (value) => {
        this.props.getPieValues(this.props.member,{month:this.state.monthExpenses, year:value, tipoTransaccion:"EGRESO"});
        this.setState({ yearExpenses: value });
    }

    onValueChangeMonthExpenses = (value) => {
        this.props.getPieValues(this.props.member,{month:value, year:this.state.yearExpenses, tipoTransaccion:"EGRESO"});
        this.setState({ monthExpenses: value });
    }

    render() {
        const { error } = this.props;
        var allItems = new Array();
        const year = new Date().getFullYear();
        allItems = ['2018','2017','2016','2015'];
        const dataIncome = this.props.incomeValues;
        const dataExpense = this.props.expenseValues;
        const colors = ["#600080", "#2556BA", "#26995F", "#99263D", "#7F9B0F", "#9E2807", "#C98704", "#33260E"];
        const pieDataIncome = dataIncome.filter(value => value > 0)
                                        .map((value, index) => ({
                                            value,
                                            svg: {
                                              fill: colors[index],
                                              onPress: () => {
                                                console.log('press', index)
                                              },
                                            },
                                            key: `income-${index}`,
                                        }));
        const pieDataExpense = dataExpense.filter(value => value > 0)
                                          .map((value, index) => ({
                                              value,
                                              svg: {
                                                fill: colors[index],
                                                onPress: () => {
                                                  console.log('press', index)
                                                },
                                              },
                                              key: `expense-${index}`,
                                          }));

            const LabelsIncome = ({ slices, height, width }) => {
              return slices.map((slice, index) => {
                  const { labelCentroid, pieCentroid, data } = slice;
                  return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={15}
                        stroke={'black'}
                        strokeWidth={0.2}>
                        {data.value}
                    </Text>
                )
              })
            }

            const LabelsExpense = ({ slices, height, width }) => {
              return slices.map((slice, index) => {
                  const { labelCentroid, pieCentroid, data } = slice;
                  return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={15}
                        stroke={'black'}
                        strokeWidth={0.2}>
                        {data.value}
                    </Text>
                )
              })
            }

            const pieDaIncome = pieDataIncome.length ? (
                <PieChart style={{ height: 190 }}
                    data={ pieDataIncome }
                    valueAccessor={({ item }) => item.value}
                    spacing={5}
                    innerRadius={'0%'}>
                  <LabelsIncome />
                </PieChart>
            ) : (
              <View style={ { height: 190 } }>
                <Messages message={"No hay datos"} type="info" />
              </View>
            );

            const pieDaIncomePoints = pieDataIncome.length ? (
              <View>
                {pieDataIncome && pieDataIncome.map((item, idx) => {
                    return (
                      <View style={{flexDirection:"row", marginBottom: 5}}>
                          <View style={{flex:1, width:'20%'}}>
                            <Svg
                              height="20"
                              width="20">
                              <Circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill={item.svg.fill}>
                              </Circle>
                            </Svg>
                          </View>
                          <View style={{flex:1, width:'80%'}}>
                              <Texto>
                                { this.props.incomeLabels[idx] }
                              </Texto>
                          </View>
                      </View>
                    );
                  })}
              </View>
            ) : (
              null
            );

            const pieDaExpensePoints = pieDataIncome.length ? (
              <View>
                {pieDataExpense &&  pieDataExpense.map((item, idx) => {
                    return (
                      <View style={{flexDirection:"row", marginBottom: 5}}>
                          <View style={{flex:1, width:'20%'}}>
                            <Svg
                              height="20"
                              width="20">
                              <Circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill={item.svg.fill}>
                              </Circle>
                            </Svg>
                          </View>
                          <View style={{flex:1, width:'80%'}}>
                            <Texto>
                              { this.props.expenseLabels[idx] }
                            </Texto>
                          </View>
                      </View>
                    );
                  })}
              </View>
            ) : (
              null
            );

            const pieDaExpense = pieDataExpense.length ? (
                <PieChart style={{ height: 190 }}
                    data={ pieDataExpense }
                    valueAccessor={({ item }) => item.value}
                    spacing={5}
                    innerRadius={'0%'}>
                  <LabelsExpense />
                </PieChart>
            ) : (
              <View style={ { height: 190 } }>
                <Messages message={"No hay datos"} type="info" />
              </View>
            );

            return (
                <Container>
                    <Content padder>
                        <Header
                            title="Mi Cartera"
                            content="Información Financiera"/>

                        { error && <Messages message={error} /> }

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
                                style={{ width: undefined }}
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
                          <Col size={30}>
                            { pieDaIncomePoints }
                          </Col>
                          <Col size={70}>
                            { pieDaIncome }
                          </Col>
                        </Grid>
                        <Grid>
                          <Col>
                            <H3>Egresos</H3>
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
                              selectedValue={this.state.monthExpenses}
                              onValueChange={this.onValueChangeMonthExpenses}>
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
                                  style={{ width: undefined }}
                                  selectedValue={this.state.yearExpenses}
                                  onValueChange={this.onValueChangeYearExpenses}>
                                        {allItems && allItems.map((anho,i) => {
                                          return (
                                            <Picker.Item key={i} label={anho} value={anho} />
                                        )})}
                              </Picker>
                            </View>
                          </Col>
                        </Grid>
                        <Grid>
                            <Col size={30}>{ pieDaExpensePoints }</Col>
                            <Col size={70}>{ pieDaExpense }</Col>
                        </Grid>
                    </Content>
                </Container>
                )
    }

}

export default MyWallet;
