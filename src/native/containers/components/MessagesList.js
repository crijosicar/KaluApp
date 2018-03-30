import React, { Component } from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import MessageRow from '../MessageRow';

const ITEM_HEIGHT = 50

class MessageListComponent extends Component {

  constructor() {
    super()

    this.renderItem = ({item}) => {
      return <MessageRow message={item} />
    }

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {'Escribir...'}
        </Text>
      )
    }

    this.itemLayout = (data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )
  }

  componentDidUpdate() {
    if (this.props.data.length) {
        this.flatList.scrollToIndex({animated: true, index: 0});
    }
  }

  render() {
    const data = this.props.data
    const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle

    return (
      <FlatList
        ref={(c) => { this.flatList = c }}
        style={styles.container}
        contentContainerStyle={contentContainerStyle}
        data={data}
        keyExtractor={item => item.time}
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

export default MessageListComponent
