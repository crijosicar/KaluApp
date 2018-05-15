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

class MyPrediction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
   componentWillMount(){
       this.props.getPredictionValues(this.props.member, {tipoTransaccion:"EGRESO"});
   }
    
    render() {
        const nodoNumero=1;
        const { error } = this.props;
        const data=this.props.expensePredictionValues;
        const resultado = Object.keys(data)[nodoNumero]; 
        let categoria;
        const monto="data."+resultado;
        
            
        switch(monto) {
            case "data.comida":
            categoria= data.comida;
                break;
            case "data.ropa":
            categoria= data.ropa;
                break;
            case "data.facturas":
            categoria= data.facturas;
                break;
            case "data.entretenimiento":
            categoria= data.entretenimiento;
                    break;
            case "data.comunicaciones":
            categoria= data.comunicaciones;
                    break;
                            
            case "data.hogar":
            categoria= data.hogar;
                    break;
            case "data.salud":
            categoria= data.salud;
                    break;
                               
                                    
            default:
                categoria= data.transporte;
        }
           
            return (
                <Container>
            
                <Content>
                <Spacer size={30} />
                <H2 style={{margin:15}}>
                Pronótisco de gasto
                </H2 >
                <Label style={{margin:25}}>
                Tienes que comprar:
                </Label>
                
                  <Card>
                    
                    <Button full info style={{margin:15}}>
                        <Text> {resultado} </Text>
                    </Button>
                     
                    <Button full style={{margin:15, backgroundColor:'white'}}>
                       <Text style={{textAlign:"center", fontSize: 15 , color:"#99badd"}}>MONTO:</Text>
                    </Button>
                    
                    <Button full info style={{margin:15}}>
                      <Text> $ {categoria} </Text>
                    </Button>
                    <Button full style={{margin:15, backgroundColor:'white'}}>
                       <Text style={{textAlign:"center", fontSize: 15 , color:"#99badd"}}>Tu periodicidad de compra es:</Text>
                    </Button>
                    <Button full info style={{margin:15}}>
                      <Text> cada xx días </Text>
                    </Button>
                   </Card>
                </Content>
              </Container>
        )
    }

}

export default MyPrediction;
