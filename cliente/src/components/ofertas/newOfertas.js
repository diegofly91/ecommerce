import React, { Component, Fragment } from 'react'
import {Form, Button } from 'semantic-ui-react'
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import FormOferta from './formOfertas';
import {NEW_OFERTAS} from '../../mutations'
import {Mutation} from 'react-apollo'

class NewOferta extends Component{
    state = {
        activo: true,
        productos: '',
        fecha_inicio: null,
        fecha_fin: null,
        descuento: null,
        id_descuento: null
    }
    options = async () =>{
      const input = await this.formulario.returnOptions();
      this.setState({
          activo: input.activo,
          productos: input.productos,
          fecha_inicio: input.fecha_inicio,
          fecha_fin: input.fecha_fin,
          descuento: Number(input.descuento),
          id_descuento: Number(input.id_descuento)
      })
    }
    render(){
        const {productos, descuento, id_descuento, fecha_inicio, fecha_fin,activo} = this.state;
        return(
            <Fragment>
                <h2>Ofertas</h2>
                <FormOferta  
                    onChange={this.options}  
                    ref={instance => { this.formulario = instance; }}
                />
                 <Mutation 
                            mutation={ NEW_OFERTAS }  
                            onCompleted={ async e => {
                                            swal(e.newOferta, "You clicked the button!", "success")
                                            .then((value) => {
                                                this.props.history.push("/ofertas")
                                            })
                                        }}
                        >
                            {( newOferta, {loading, error, data}) => {
                                if(loading) return <Loading />;
                                if(error) return <Error  error={error} />;
                                return (
                                    <Button content='Crear'   
                                           disabled={ (id_descuento && descuento && productos) && !(id_descuento == 1 && descuento > 100) ? false : true }
                                             primary
                                             size="big"
                                             onClick={ async (e) => {
                                                            const input = {
                                                                id_descuento,
                                                                descuento,
                                                                fecha_inicio,
                                                                fecha_fin,
                                                                productos,
                                                                activo
                                                            }
                                                            newOferta({variables:{input}})

                                                 }
                                             }
                                    />

                            )}}
                  </Mutation>
            </Fragment>
        )
    }
}
export default withRouter(NewOferta);