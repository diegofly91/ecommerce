import React, { Component } from 'react'
import {CATEGORY_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import FormCategory from './formCategory'

class EditCategoria extends Component {
    state = { 
             id : Number(this.props.match.params.ruta)
            }
    render() {
        const {id} = this.state;
        return (
            <Query query={CATEGORY_QUERY} variables={{id}} >
            {({loading, error, data}) =>{
                if(loading) return "Cargando";
                if(error) return `Error ${error}`;
                return (
                   <FormCategory category={data.category}/>
                )}}
            </Query>    
        )
    }
}
export default EditCategoria;