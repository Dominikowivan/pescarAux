import React from 'react';
import axios from 'axios';
import link from '../../utils/apilink.json';
import { deleteFromList } from '../../actions/deleteAction'
import { connect } from 'react-redux'


export class UpdateSubmit extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.put(link.link + `/alumni/${this.state.id}`)
      .then(res => {
        console.log("push:",res);
      })

      this.props.deleteFromList(this.state.id);
  }

  render() {
    return (
     
        <form onSubmit={this.handleSubmit}>
          <label style={{ flex: '1' }}>
            <button  type="submit">Guardar Cambios y/o Actualizaciones en el sistema</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSubmit)
