import React, { Component } from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import MessageRow from '../MessageRow';

const ITEM_HEIGHT = 50

class MessageListComponent extends Component {

  constructor() {
    super()

    this.renderItem = this.renderItem.bind(this);
    this.emptyList = this.emptyList.bind(this);
    this.itemLayout = this.itemLayout.bind(this);
  }

  componentDidUpdate() {
    if (this.props.data.length){
        this.flatList.scrollToIndex({animated: true, index: 0});
    }
  }

  keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => {
    return <MessageRow message={item}/>
  }

  emptyList = () => {
    return (
      <Text
        style={styles.placeholder}>
        {'Escribe un mensajes'}
      </Text>
    )
  }

  itemLayout = (data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )

  render() {
    const data = this.props.data;
    const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle;

    return (
      <FlatList
        ref={(c) => { this.flatList = c }}
        style={styles.container}
        contentContainerStyle={contentContainerStyle}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        ListEmptyComponent={this.emptyList}
        inverted />
    )
  }
}

MessageListComponent.propTypes = {
  data: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#eeeeee'
  }
})

export default MessageListComponent;
