import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { css, StyleSheet } from 'aphrodite'

import Message from '../Message'

const styles = StyleSheet.create({
  container: {
    flex: '1',
    padding: '10px 10px 0 10px',
    background: '#fff',
    overflowY: 'auto'
  },
  dayDivider: {
    position: 'relative',
    margin: '1rem 0',
    textAlign: 'center',
    '::after': {
      position: 'absolute',
      top: '50%',
      right: '0',
      left: '0',
      height: '1px',
      background: 'rgb(240,240,240)',
      content: '""'
    }
  },
  dayText: {
    zIndex: 1,
    background: '#fff',
    position: 'relative',
    padding: '0 12px'
  }
})

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.array,
    loadingOlderMessages: PropTypes.bool,
    moreMessages: PropTypes.bool,
    onLoadMore: PropTypes.func
  }

  static defaultProps = {
    messages: [],
    loadingOlderMessages: false,
    moreMessages: true,
    onLoadMore: () => {}
  }

  renderMessages(messages){
    return messages.map((message) => {
      return (
        <Message key={message.id} message={message} />
      )
    })
  }

  renderDays(){
    const messages = this.props.messages
      .map((m) => {
        return {
          ...m,
          day: moment(m.inserted_at).format('MMMM Do')
        }
      })
    const dayGroups = _.groupBy(messages, 'day')
    const days = []
    _.mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value })
    })
    const today = moment().format('MMMM Do')
    const yestoday = moment().subtract(1, 'days').format('MMMM Do')
    return days.map((day) => {
      return (
        <div key={day.date}>
          <div className={css(styles.dayDivider)}>
            <span className={css(styles.dayText)}>
              {day.date === today && 'Today'}
              {day.date === yestoday && 'Yestoday'}
              {![today, yestoday].includes(day.date) && day.date}
            </span>
          </div>
          {this.renderMessages(day.messages)}
        </div>
      )
    })
  }

  render() {
    const { loadingOlderMessages, moreMessages } = this.props
    return (
      <div className={css(styles.container)}>
        {
          moreMessages &&
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn-link btn-sm"
              onClick={this.props.onLoadMore}
              disabled={loadingOlderMessages}
            >
              { loadingOlderMessages ? 'Loading' : 'Load More'}
            </button>
          </div>
        }
        {this.renderDays()}
      </div>
    )
  }
}

export default MessageList
