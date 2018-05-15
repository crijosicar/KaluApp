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
import { View, ListView, Platform, StyleSheet } from 'react-native';
import Notch from '../containers/Notch';
const platform = Platform.OS;

class MyWalletDetails extends React.Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
      }

    render() {
             

            
                  return (
                    <Container>
                    <Content padder>
                    
                                <ListView
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) => <Text>{rowData}</Text>}
                                />
                   
                    </Content>
                    <Notch></Notch>
                </Container>
        )
    }

    

}


export default MyWalletDetails;
