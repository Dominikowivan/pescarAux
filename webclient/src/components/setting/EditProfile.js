import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import './EditProfile.css';
import { showData } from '../../actions/showData';
import { updateData } from '../../actions/showData';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';

import { combineReducers } from '../../../../../../../../Library/Caches/typescript/3.4.3/node_modules/redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});
class EditProfile extends React.Component {

 state = {
      alternativeTelephone: "",
      counselor: "",
      currentJob: "",
      currentStudy: "",
      graduationYear: "",
      id:"",
      jobHistory: [],
      maximumEducation: "",
      pescarCenter: "",
      studyHistory: [],
      telephone: "",
      data:{},
     
    }
 
  
componentWillReceiveProps(nextProps, nextState){

 
  this.state.data = nextProps.updateReducer.profileToEdit;
  this.state.telephone = nextProps.updateReducer.profileToEdit.telephone;
  this.state.alternativeTelephone = nextProps.updateReducer.profileToEdit.alternativeTelephone;
  this.state.counselor = nextProps.updateReducer.profileToEdit.counselor;
  this.state.currentJob = nextProps.updateReducer.profileToEdit.currentJob;
  this.state.currentStudy = nextProps.updateReducer.profileToEdit.currentStudy;
  this.state.graduationYear = nextProps.updateReducer.profileToEdit.graduationYear;
  this.state.id = nextProps.updateReducer.profileToEdit.id;
  this.state.maximumEducation =nextProps.updateReducer.profileToEdit.maximumEducation;
  this.state.pescarCenter =nextProps.updateReducer.profileToEdit.pescarCenter;
  this.state.studyHistory =nextProps.updateReducer.profileToEdit.studyHistory;
}




handleClickUpdate = () => {

/*
const datos={
  alternativeTelephone: stateATele,
  counselor: "",
  currentJob: "",
  currentStudy: "",
  graduationYear: "",
  id:stateId,
  jobHistory: [],
  maximumEducation: "",
  pescarCenter: "",
  studyHistory: [],
  telephone: "",

}*/
console.log("Hola si estamos persisitiendo cambios", this.state);

this.props.updateData(this.state);

}

onChangeHandler = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })

}
render(){
  console.log('UPDATE');
  const v = this.state.data.id;
  let o1= this.state.alternativeTelephone;
  if (v!=null) {
  
  return (
   
    <div className="container-profile">
    <h2>Formulario para editar estudiante actual ID:  [ {this.state.id} ]</h2>
       

  

      <TextField
        label=""
        id="margin-none"
        defaultValue = {this.state.telephone}
        type="text" className="form-control"
        helperText="Telefono principal"
        margin='normal'
        onChange={this.onChangeHandler} type="number" className="form-control"
      />

       
      <TextField
        label=""
        id="margin-none"
        defaultValue = {this.state.alternativeTelephone}
        helperText="Telefono alternativo"
        margin='normal'
        onChange={this.onChangeHandler} type="number" className="form-control"

      />
       
                                  
      
  
      <TextField
        label=""
        id="margin-dense"
        defaultValue={this.state.maximumEducation}
        helperText="Maximo grado academico"
        margin="normal"
        placeholder ={this.state.maximumEducation}
        onChange={this.onChangeHandler} type="string" className="form-control"

      />
                <TextField
        label=""
        id="margin-none"
        defaultValue={this.state.graduationYear}
        helperText="Fecha de graduacion"
        margin="normal"
        onChange={this.onChangeHandler} type="number" className="form-control"
        name="graduationYear"
      />


      <TextField
        label=""
        id="margin-dense"
        defaultValue={this.state.counselor}
        helperText="Consejero"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />
           <TextField
        label=""
        id="margin-none"
        defaultValue={this.state.currentJob}
        helperText="Trabajo Actual"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />





      <TextField
        label=""
        id="margin-normal"
        defaultValue={this.state.jobHistory}
        helperText="Experiencia Laboral"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />


      <TextField
        label=""
        id="margin-normal"
        defaultValue={this.state.pescarCenter}
        helperText="Sede"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />


      <TextField
        label=""
        id="margin-dense"
        defaultValue={this.state.currentStudy}
        helperText="Estudio actual"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />

<TextField
        label=""
        id="margin-normal"
        defaultValue={this.state.studyHistory}
        helperText="Historial  Academico"
        margin="normal"
        onChange={this.onChangeHandler} type="string" className="form-control"

      />

  
      <h4>Para Actualizar estudiante click en GUARDAR CAMBIOS</h4>

      {/*<button onClick={(e) =>  this.handleClickUpdate(e,
      this.state.id ,
      this.state.alternativeTelephone,this.state
        )}>GUARDAR   CAMBIOS
      </button>*/}

      <button onClick={this.handleClickUpdate}>GUARDAR   CAMBIOS
      </button>
 



      <div className="col-md-4 d-flex justify-content-end acciones"></div>
      <h5>Para Volver a la Tabla con la lista de estudiantes click en Volver</h5>
      <Link to={`../../../setting`}  className="btn btn-primary mr-2"> Volver </Link>

       </div>
  );
  } else {
   return (<div> <h3>.......................               Loading                .......................</h3>             </div>);
 }
 };
}




const mapDispatchToProps = {  
updateData,
  showData
  
}

function mapStateToProps(state)
{
  return{
  auth: state.auth,
  profileData: state.profileData,
  updateReducer: state.updateReducer
  }
    
}


export default compose(connect(mapStateToProps,mapDispatchToProps),withStyles(styles))(EditProfile)
