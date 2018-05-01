import React, { Component } from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import MessageRow from '../MessageRow';

const ITEM_HEIGHT = 50;

class MessageListComponent extends Component {

  constructor() {
    super()

    this.renderItem = this.renderItem.bind(this);
    this.emptyList = this.emptyList.bind(this);
    this.itemLayout = this.itemLayout.bind(this);
  }

  componentDidMount() {
    //if (this.props.data.length){
      //console.log("componentDidMount (props) -> ", this.props);
      //this.refs._flatList.scrollToOffset({x: 0, y: 0, animated: true});
    //}
  }

  componentDidUpdate() {
    //if (this.props.data.length){
  //      console.log("componentDidUpdate (props) -> ", this.props);
    //    this.refs._flatList.scrollToOffset({x: 0, y: 0, animated: true});
        //this.refs._flatList.scrollToIndex({animated: true, index: 0});
        //this.refs._flatList.scrollTo({x: 0, y: 0, animated: true});
        //this.flatList.scrollToIndex({animated: true, index: 0});
        //this.flatList.scrollToIndex({x: 0, y: 0, animated: true});
    //}
  }

  renderItem = ({item}) => {
    return <MessageRow message={item}/>
  }

  emptyList = () => {
    return (
      <Text
        style={styles.placeholder}>
        {'Escribe un mensaje'}
      </Text>
    )
  }

  itemLayout = (data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )

  render() {
    const { data } = this.props;
    const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle;

    return (
      <FlatList
        ref="_flatList"
        contentContainerStyle={contentContainerStyle}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        ListEmptyComponent={this.emptyList}
        inverted />
    );
  }
}

MessageListComponent.propTypes = {
  data: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '10%',
    backgroundColor: '#eeeeee'
  },
  flatlistContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
  }
})

export default MessageListComponent;
