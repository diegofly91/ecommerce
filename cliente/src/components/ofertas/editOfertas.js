import React, { Component, Fragment } from 'react'
import {Query, Mutation} from 'react-apollo'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import {OFERTA_QUERY} from '../../queries'
import {EDIT_OFERTA} from '../../mutations'
import FormOferta from './formOfertas'
import swal from 'sweetalert'
import {Button} from 'semantic-ui-react'


class EditOfert extends Component {
    state = {
        id:  Number(this.props.match.params.id),
        id_producto:null,
        descuento: null,
        id_descuento: null,
        activo: null,
        fecha_inicio: null,
        fecha_fin: null,
        fecha: null
    }
    options = async () =>{
        const input = await this.formulario.returnOptions();
        this.setState({
            ...this.state,
            activo: input.activo,
            fecha_inicio: input.fecha_inicio,
            fecha_fin: input.fecha_fin,
            descuento: Number(input.descuento),
            id_descuento: input.id_descuento
        })
    }
    render(){
        const {id, id_descuento,descuento,fecha_inicio,fecha_fin,id_producto,activo} = this.state;
        return (
            <Fragment>
                <Query query={OFERTA_QUERY} variables={{id}} fetchPolicy="network-only">
                {({loading, error, data}) =>{
                    if(loading) return "Cargando";
                    if(error) return `Error ${error}`;
                    const { product } = data.oferta;
                    this.state.id_producto= data.oferta.product.id;
                    return (
                        <Fragment>
                            <h2> Editar la oferta de {product.nombre}</h2>
                            <FormOferta  
                                    onChange={this.options}  
                                    ref={instance => { this.formulario = instance; }}
                                    data={data.oferta}
                                    oferta={data.oferta}
                            />
                        </Fragment>
                    )}}
                </Query>
                <Mutation 
                            mutation={ EDIT_OFERTA }  
                            onCompleted={ async e => {
                                            swal(e.editOferta, "You clicked the button!", "success")
                                            .then((value) => {
                                                this.props.history.push("/ofertas")
                                            })
                                        }}
                        >
                            {( editOferta, {loading, error, data}) => {
                                if(loading) return <Loading />;
                                if(error) return <Error  error={error} />;
        
                                return (
                                    <Button content='Editar'   
                                           disabled={ (id_descuento && descuento ) && !(id_descuento == 1 && descuento > 100) ? false : true }
                                             primary
                                             size="big"
                                             onClick={ async (e) => {
                                                            const input = {
                                                                id_descuento,
                                                                descuento,
                                                                fecha_inicio,
                                                                fecha_fin,
                                                                activo,
                                                                id,
                                                                id_producto
                                                            }
                                                            editOferta({variables:{input}})

                                                 }
                                             }
                                    />

                            )}}
                  </Mutation>   
            </Fragment>
        )
    }
}

export default EditOfert;
