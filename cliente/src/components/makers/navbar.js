import React, { Fragment, useContext, useState } from 'react'
import { List, Segment, Icon, Input } from 'semantic-ui-react'
import { direct } from '../../index';
import { Link } from 'react-router-dom';
import {CartContext} from '../context'
import {NavbarCateg} from './navbarCateg'

export default function Nabvar(){
   const [activeItem,handleItemClick] = useState(false);
    return( 
            <Fragment>  
                       <Segment inverted  className="bg-dark p-2" style={{borderRadius:"0", marginBottom:"0"}}>
                           <div className="d-flex container p-0">                
                                <div className="col-lg-9  col-md-9 col-sm-9 col-xs-10 " >
                                <List horizontal>
                                        <List.Item>
                                             <Icon 
                                            name="facebook f"
                                            size="large"
                                            />
                                        </List.Item>
                                        <List.Item>
                                            <Icon 
                                            name="instagram"
                                            size="large"
                                            />
                                        </List.Item>
                                        <List.Item>
                                            <Icon 
                                            name="twitter"
                                            size="large"
                                            />
                                        </List.Item>
                                    </List>
                                </div>
                                <div className="col-lg-3  col-md-3 col-sm-3 col-xs-2 d-flex flex-row-reverse" >
                                <List horizontal>
                                        <List.Item>
                                            <Icon 
                                            name="user"
                                            size="large"
                                            />
                                        </List.Item>
                                </List>          
                                </div>
                            </div>
                        </Segment>
                        <div className="container-fluid p-0">	
                                <div className="container pl-3 pr-3">
                                    <div className="row mb-3" id="cabezote">
                                        <div className="col-lg-3 p-1 d-flex align-items-center">
                                            <Link to="/Tienda">
                                               <img src={`${direct}/img/plantilla/logo.png`}  alt="" style={{width:"100%"}}/> 
                                            </Link>
                                        </div> 
                                        <div className="input-group col-lg-9 d-flex align-items-center justify-content-end p-1" >
                                            <Input icon='search' placeholder='Search...'style={{height:"45px",flexGrow:"1",maxWidth:"500px"}}/>
                                            <div className="d-flex align-items-center align-item-center justify-content-end m-1 pr-2 pl-2 ">
                                                <Link to="/Tienda/cart">
                                                    <button className="btn btn-block bg-primary text-white"> 
                                                        <Icon 
                                                            name="cart"
                                                        />
                                                        <NumCart />
                                                    </button>
                                                </Link> 
                                                <Icon 
                                                    name="bars"
                                                    color="black"
                                                    size="big"
                                                    className="pl-2 pr-2"
                                                    onClick={ () => handleItemClick(!activeItem)}
                                                />
                                            </div>
                                            </div>
                                        </div>
                                    {activeItem ?
                                            <NavbarCateg click={handleItemClick} />   
                                        : ''
                                    }
                                </div>
                            </div>
                    </Fragment>    
    )
}

const NumCart = () => {
    const {cart} = useContext(CartContext)
    return (
         <Fragment>
           {cart.length}    
         </Fragment>
    )
}
