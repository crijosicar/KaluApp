import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Colors from '../../../native-base-theme/variables/commonColor';

const Notch = ({ message, type }) => (
  <View style={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.brandSuccess,
        height: 60,
      }}>
    <Text style={{ color: '#fff', textAlign: 'center' }}>{message}</Text>
  </View>
);

Notch.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

Notch.defaultProps = {
  message: 'Ocurrió un error inesperado',
  type: 'error',
};

export default Notch;
