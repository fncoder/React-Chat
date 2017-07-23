import React from 'react';

class Messages extends React.Component {
  render () {
    let changelog = this.props.list.map((list,index) =>
      <li className='message' key={index}>
        <p className='date'><span>{list.nickname}</span><span>{list.time}</span></p>
        <p className='text'>
          <span className='joined'>{list.status} {list.joined}</span>
          {list.msg}
        </p>
      </li>
					)

    return (
      <div className='content'>
        {changelog}
      </div>
    )
  }
}

export default Messages
