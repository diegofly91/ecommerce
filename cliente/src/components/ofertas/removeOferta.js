import React, { Component } from 'react'
import {Icon} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'
import swal from 'sweetalert'
import {REMOVE_OFERTA} from '../../mutations'


class RemoveOfert extends Component{
    state = {
        id: this.props.id,
        name: this.props.name
    }
    render(){
        const {id, name } = this.state;
        return(
            <Mutation mutation={ REMOVE_OFERTA }  
                onCompleted={ async e => {
                    this.props.refetch().then( () => {
                            swal({
                                title: 'Ejecutando!',
                                text: 'Se ha borrado la oferta!',
                                icon: 'success'
                            })     
                    })   
                }}
            >
                {( removeOferta, {loading, error, data}) => {
                    return (
                        <Icon 
                            onClick={ e => {
                                swal({
                                    title: `eliminar Oferta?`,
                                    text:  `${name}`,
                                    icon: "error",
                                    buttons: [
                                    'No, cancelar esto!',
                                    'Si, estoy seguro!'
                                    ],
                                    dangerMode: true,
                                }).then(function(isConfirm) {
                                    if (isConfirm) {
                                        removeOferta({ variables: { id }})
                                    }
                                })
                            }}
                            name='remove' 
                            color="red" 
                            style={{cursor:'pointer',position:"absolute",fontSize:"23px", zIndex:2, right:"-60px"}}
                            title="editar oferta"
                        />
                    )}}
            </Mutation>          
        )
    }
}

export default RemoveOfert;