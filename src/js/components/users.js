import React from 'react';

class Users extends React.Component {
  render () {
    let users = this.props.users.map((user, index) =>
      <li className='user' key={index}>
        {user}
      </li>
		)
    return (
      <div className='wrapper-users'>
        <ul className='users-list'>
          {users}
        </ul>
      </div>
    )
  }
}

export default Users
