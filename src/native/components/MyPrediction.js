import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';

import Spacer from './Spacer';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import { Button,Container, Content, Card, CardItem, Text, Icon, Right, Separator,H3 } from 'native-base';

import Header from './Header';

import Messages from './Messages';

class MyPrediction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
   componentWillMount(){
       this.props.getPredictionValues
   }
    
    render() {
        const { error } = this.props;
        const data=this.props.incomePredictionValues;
            return (
                <Container>
            
                <Content>
                <Spacer size={30} />
                <H3 style={{margin:15}}>
                Pronótisco de gasto
                
                </H3>
                <Spacer size={30} />
                  <Card>
                    
                        <Button full style={{margin:15, backgroundColor:'white'}}>
                      <Text style={{textAlign:"center", fontSize: 15 , color:"#99badd"}}>PARA:</Text>
                      </Button>
                      
                    
                    <Button full info style={{margin:15}}>
                        <Text> Ropa </Text>
                    </Button>
                    
                      
                     
                     
                    <Button full style={{margin:15, backgroundColor:'white'}}>
                      
                     <Text style={{textAlign:"center", fontSize: 15 , color:"#99badd"}}>EN:</Text>
                      </Button>
                      
                      
                      
                      <Button full info style={{margin:15}}>
                        <Text> 06/18 </Text>
                    </Button>
                    
                     
                    <Button full style={{margin:15, backgroundColor:'white'}}>
                     <Text style={{textAlign:"center", fontSize: 15 , color:"#99badd"}}>ES:</Text>
                      </Button>
                      
                    
                      <Button full info style={{margin:15}}>
                        <Text> $0.00 </Text>
                    </Button>
                    
                   </Card>
                </Content>
              </Container>
        )
    }

}

export default MyPrediction;
