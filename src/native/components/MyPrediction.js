import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';

import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import { Button,Container, Content, Card, CardItem,Label, Text, Icon, Right, Separator,H2 } from 'native-base';

import Header from './Header';

import Messages from './Messages';
import Subtitle from '../../../native-base-theme/components/Subtitle';
import Notch from '../containers/Notch';

class MyPrediction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

   componentWillMount(){
      this.props.getPredictionValues(this.props.member, { tipoTransaccion: "EGRESO" });
   }

   componentDidMount(){
     let { categoria =  "COMIDA" } = this.props;
     this.props.getPredictionTimeframe(this.props.member,{categoria: categoria})
   }

  render() {
        const { error } = this.props;
        const data=this.props.expensePredictionValues;
        const timeFrame=this.props.expensePredictionTimeFrame;
        let resultado = "comida";
        if(this.props.categoria){
          resultado = this.props.categoria.toLowerCase();
        }
        let categoria;
        let btnTimeframe =  null;

        if(timeFrame){
            btnTimeframe = (<Button full info style={{margin:11}}>
                                <Text style={{textAlign:"center", fontSize: 11}} > cada {timeFrame.value} {timeFrame.unit} </Text>
                            </Button>);
        }

        switch(resultado) {
            case "comida":
            categoria= data.comida;
                break;
            case "ropa":
            categoria= data.ropa;
                break;
            case "resultadofacturas":
            categoria= data.facturas;
                break;
            case "entretenimiento":
            categoria= data.entretenimiento;
                    break;
            case "comunicaciones":
            categoria= data.comunicaciones;
                    break;
            case "hogar":
            categoria= data.hogar;
                    break;
            case "salud":
            categoria= data.salud;
                    break;
            default:
                categoria= data.transporte;
        }

            return (
                <Container>

                <Content>
                <Spacer size={11} />
                <H2 style={{margin:11}}>
                Pronótisco de gasto
                </H2 >
                <Label style={{margin:11}}>
                Tienes que comprar:
                </Label>

                  <Card>

                    <Button full info style={{margin:11}}>
                        <Text style={{textAlign:"center", fontSize: 11 }}> {resultado} </Text>
                    </Button>

                    <Button full style={{margin:11, backgroundColor:'white'}}>
                       <Text style={{textAlign:"center", fontSize: 11 , color:"#99badd"}}>MONTO:</Text>
                    </Button>

                    <Button full info style={{margin:11}}>
                      <Text style={{textAlign:"center", fontSize: 11 }}> $ {categoria} </Text>
                    </Button>
                    <Button full style={{margin:11, backgroundColor:'white'}}>
                       <Text style={{textAlign:"center", fontSize: 11 , color:"#99badd"}}>Tu periodicidad de compra es:</Text>
                    </Button>

                    { btnTimeframe }
                   </Card>
                </Content>
                <Notch></Notch>
              </Container>
        )
    }

}

export default MyPrediction;
