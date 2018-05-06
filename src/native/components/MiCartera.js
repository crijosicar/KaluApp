import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Picker, Item, Label, Input, Text, Button,StyleProvider, H1, H2, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';

class MiCartera extends React.Component {

    constructor(props) {
        super(props);
        let year = new Date().getFullYear();
        this.state = {
            month: 1,
            year: year
        }
        this.onValueChangeYear = this.onValueChangeYear.bind(this);
        this.onValueChangeMonth = this.onValueChangeMonth.bind(this);
        this.updateDropdown = this.updateDropdown.bind(this);
    }

    onValueChangeMonth = (value) => {
        this.setState({ month: value });
    }

    onValueChangeYear = (value) => {
        this.setState({ year: value });
    }

    updateDropdown = () => {
        const allItems= new Array();
        for (i = 2018; i <= this.state.year; i++) {
            allItems.push(i);
        }
        const allItemsAux = allItems.map((anho,i) => {
          return (
              <Picker.Item key={i} label={anho} value={anho} />
            )
         });
        return allItemsAux;
    }

    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data.filter(value => value > 0)
                            .map((value, index) => ({
                                value,
                                svg: {
                                    fill: randomColor(),
                                    onPress: () => console.log('press', index),
                                },
                                key: `pie-${index}`,
                            }));
            return (
                <Container>
                    <Content padder>
                        <Header
                            title="Mi Cartera"
                            content="Información Financiera" />
                        <Grid>
                        <Col style={{ height: 40 }}>
                          <Picker
                            mode="dropdown"
                            selectedValue={this.state.month}
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
                        <Col style={{ height: 40 }}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.year}
                                onValueChange={this.onValueChangeYear}>
                                    {this.updateDropdown}
                            </Picker>
                        </Col>
                        </Grid>
                        <PieChart
                            style={ { height: 200 } }
                            data={ pieData }
                        />
                    </Content>
                </Container>
        )
    }

}

export default MiCartera;
