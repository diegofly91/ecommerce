import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import Error from '../Alertas/Error';

import { Mutation } from 'react-apollo';

import { AUTHENTICATION_USER} from '../../mutations'
import { async } from 'q';


const initialState = {
    mail : '',
    passw: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
         const { name, value} = e.target;
        this.setState({
            [name] : value
        })
     }


    limpiarState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = (e, athenticationUser) => {
        e.preventDefault();
        athenticationUser().then(async ( {data}) => {
            localStorage.setItem('token', data.athenticationUser.token);
            await this.props.refetch();
            this.limpiarState();
            setTimeout(() => {
                this.props.history.push('/productos')
            }, 2000);
        })
     
     }

     validarForm = () => {
        const {mail, passw} = this.state;

        const noValido = !mail || !passw;
        return noValido;
     }
    render() { 

        const {mail, passw} = this.state;
      
        return ( 
            <Fragment>
                 <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ AUTHENTICATION_USER }
                        variables={{mail, passw}}    
                    >
                    {( athenticationUser, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.iniciarSesion(e, athenticationUser) } 
                                className="col-md-8"
                            >

                            {error && <Error error={error} />}
                            

                            <div className="form-group">
                                <label>mail</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={mail}
                                    type="email" 
                                    name="mail" 
                                    className="form-control" 
                                    placeholder="Email usuario" 
                                />
                            </div>
                            <div className="form-group">
                                <label>password</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={passw}
                                    type="password" 
                                    name="passw" 
                                    className="form-control" 
                                    placeholder="password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Iniciar Sesión
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Login);