import React, { Component, Fragment } from 'react'
import {Form, Button } from 'semantic-ui-react'
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import FormOferta from './formOfertas';

class NewOferta extends Component{
    render(){
        return(
            <Fragment>
                <h2>Ofertas</h2>
                <FormOferta />
            </Fragment>
        )
    }
}
export default NewOferta;