import React from 'react'
import {ApolloConsumer} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'

const cerrarSesionUsuario = (cliente, history) =>{
    localStorage.removeItem('token','');
    cliente.resetStore();
    history.push('/login')
}
const CerrarSesion = ({history}) => (
    <ApolloConsumer>
        {cliente => {
            return(
                    <Button animated='vertical' onClick={()=> cerrarSesionUsuario(cliente, history)} size="small">
                        <Button.Content hidden>Salir</Button.Content>
                            <Button.Content visible>
                                <Icon  name='sign-in' />
                            </Button.Content>
                    </Button>
            );
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSesion);