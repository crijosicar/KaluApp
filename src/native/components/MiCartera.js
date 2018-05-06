import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Picker, Item, Label, Input, Text, Button,StyleProvider, H1, H2, H3, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg'

class MiCartera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monthIncoming: "",
            yearIncoming: "",
            monthOutcoming: "",
            yearOutcoming: "",
        }
        this.onValueChangeYear = this.onValueChangeYear.bind(this);
        this.onValueChangeMonth = this.onValueChangeMonth.bind(this);
    }

    componentDidMount(){}

    onValueChangeMonth = (value) => {
        this.setState({ monthIncoming: value });
    }

    onValueChangeYear = (value) => {
        this.setState({ yearIncoming: value });
    }

    onValueChangeMonthOutcoming = (value) => {
        this.setState({ monthOutcoming: value });
    }

    onValueChangeYearOutcoming = (value) => {
        this.setState({ yearOutcoming: value });
    }

    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
        const pieData = data.filter(value => value > 0)
                            .map((value, index) => ({
                                value,
                                svg: {
                                  fill: randomColor(),
                                  onPress: () => console.log('press', index),
                                },
                                key: `pie-${index}`,
                            }));

                            const pieData2 = data.filter(value => value > 0)
                                                .map((value, index) => ({
                                                    value,
                                                    svg: {
                                                      fill: randomColor(),
                                                      onPress: () => console.log('press', index),
                                                    },
                                                    key: `pie-${index}`,
                                                }));

              const Labels = ({ slices }) => {
                  return slices.map((slice, index) => {
                      const { labelCentroid, pieCentroid, data } = slice;
                      return (
                          <G key={ index }>
                              <Line
                                  x1={ labelCentroid[ 0 ] }
                                  y1={ labelCentroid[ 1 ] }
                                  x2={ pieCentroid[ 0 ] }
                                  y2={ pieCentroid[ 1 ] }
                                  stroke={ data.svg.fill }
                              />
                              <Circle
                                  cx={ labelCentroid[ 0 ] }
                                  cy={ labelCentroid[ 1 ] }
                                  r={ 15 }
                                  fill={ data.svg.fill }
                              />
                          </G>
                      )
                  })
              }

            return (
                <Container>
                    <Content padder>
                        <Header
                            title="Mi Cartera"
                            content="Información Financiera"/>
                        <Grid>
                          <Col>
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
                              onValueChange={this.onValueChangeMonth}>
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
                          </Col>
                          <Col>
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
                                onValueChange={this.onValueChangeYear}>
                                <Picker.Item label="Enero" value="1" />
                            </Picker>
                          </Col>
                        </Grid>
                        <Grid>
                          <Col>
                            <PieChart
                                style={ { height: 240 } }
                                data={ pieData2 }
                                innerRadius={ 20 }
                                outerRadius={ 55 }
                                labelRadius={ 80 }>
                                <Labels/>
                            </PieChart>
                          </Col>
                        </Grid>
                        <Grid>
                          <Col>
                            <Picker
                              mode="dropdown"
                              iosHeader="Seleccione..."
                              iosIcon={<Icon name="ios-arrow-down-outline" />}
                              headerBackButtonText="< Volver"
                              placeholder="Mes"
                              placeholderStyle={{ color: "#2874F0" }}
                              note={false}
                              style={{ width: undefined }}
                              selectedValue={this.state.monthOutcoming}
                              onValueChange={this.onValueChangeMonthOutcoming}>
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
                          </Col>
                          <Col>
                              <Picker
                                  mode="dropdown"
                                  iosHeader="Seleccione..."
                                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                                  headerBackButtonText="< Volver"
                                  placeholder="Año"
                                  placeholderStyle={{ color: "#2874F0" }}
                                  note={false}
                                  style={{ width: undefined }}
                                  selectedValue={this.state.yearOutcoming}
                                  onValueChange={this.onValueChangeYearOutcoming}>
                                  <Picker.Item label="Enero" value="1" />
                              </Picker>
                          </Col>
                        </Grid>
                        <Grid>
                          <Col>
                            <PieChart
                                style={ { height: 240 } }
                                data={ pieData }
                                innerRadius={ 20 }
                                outerRadius={ 55 }
                                labelRadius={ 80 }>
                              <Labels/>
                            </PieChart>
                          </Col>
                        </Grid>
                    </Content>
                </Container>
                )
    }

}

export default MiCartera;
