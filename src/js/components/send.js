import React from 'react';

class Send extends React.Component {
  render () {
    return (
      <div className='bottom'>
        <input type='text' onKeyDown={this.props.sendMessage} placeholder='Send something' value={this.props.inputValue} onChange={(e) => this.props.updateValue(e)} className='messages' />
        <button type='button' className='btn-message' />
      </div>
    )
  }
}

export default Send
