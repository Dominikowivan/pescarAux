import React from 'react';
import axios from 'axios';
import link from '../../utils/apilink.json';
import { deleteFromList } from '../../actions/deleteAction'
import { connect } from 'react-redux'


export class RemoveConfirm extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.delete(link.link + `/alumni/${this.state.id}`)
      .then(res => {
        console.log("deletion:",res);
      })

      this.props.deleteFromList(this.state.id)
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

const mapStateToProps = (state) => ({
 
})

const mapDispatchToProps = {
 deleteFromList
}
export default connect(mapStateToProps, mapDispatchToProps)(RemoveConfirm)
