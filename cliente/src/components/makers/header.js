import React, { Component } from 'react'
import {Icon} from 'semantic-ui-react'


class Header extends Component{
  render(){
    return(
        <div className="container-fluid d-flex justify-content-center align-center" key="top" style={{background: "rgb(0, 0, 0)", color: "rgb(255, 255, 255)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9  col-md-9 col-sm-8 col-xs-12 social">
                        <ul className="d-flex">
                            <li>
                                <Icon 
                                    name='facebook f' 
                                    size="large" 
                                    style={{cursor:'pointer'}}
                                    title=""
                                />   
                            </li>
                            <li>
                            <Icon 
                                    name='youtube' 
                                    size="large" 
                                    style={{cursor:'pointer'}}
                                    title=""
                                />   
                            </li>
                            <li>
                            <Icon 
                                    name='twitter' 
                                    size="large" 
                                    style={{cursor:'pointer'}}
                                    title=""
                                /> 
                            </li>
                            <li>
                            <Icon 
                                    name='instagram' 
                                    size="large" 
                                    style={{cursor:'pointer'}}
                                    title=""
                                /> 
                            </li>
                        </ul>
                        </div>
                        <div className="col-lg-3  col-md-3 col-sm-4 col-xs-12 registro">
                        <ul>
                            <li>
                                {/* <a href="#modalIngreso" data-toggle="modal">Ingresar</a> */}
                            </li>
                            <li> | </li>
                            <li>
                                {/* <a href="#modalRegistro" data-toggle="modal">Crear una cuenta</a> */}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
        </div>
    )
 }

}

export default Header;