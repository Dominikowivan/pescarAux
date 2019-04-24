import React from 'react';
import axios from 'axios';

export default class RemoveConfirm extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("lpm")
    axios.delete(`/alumni/${this.state.id}`)
      .then(res => {
        console.log("deletion:",res);
      })
  }

  render() {
    return (
     
        <form onSubmit={this.handleSubmit}>
          <label style={{ flex: '1' }}>
            DNI del usuario a Eliminar :
            <input type="text" name="id" onChange={this.handleChange} />
            <button  type="submit">Eliminar</button>
          </label>
          
        </form>

    )
  }
}