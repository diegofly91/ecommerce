import React, { Component, Fragment } from 'react'
import { List, Segment, Icon, Input } from 'semantic-ui-react'
import { direct } from '../../index';
import { Link } from 'react-router-dom';
import NavbarCateg from './navbarCateg'

class Nabvar extends Component{
        state = { 
                 activeItem: false,
                 categ: '',
                }
        handleItemClick = () => this.setState({ activeItem: !this.state.activeItem })  
        render() {
            const {activeItem} = this.state;
          return (
            <Fragment>  
                <Segment inverted style={{borderRadius:"0"}}>
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
                        <div className="container p-0">
                            <div className="row mb-3" id="cabezote">
                                <div className="col-lg-3">
                                    <Link to="/Tienda">
                                       <img src={`${direct}/img/plantilla/logo.png`} width="200" alt="" className="img-responsive"/> 
                                    </Link>
                                </div>
                                <div className="col-lg-6  d-flex align-items-center p-0">
                                    <div style={{fontSize: "20px",fontWeight:"600"}} className="col-lg-5 col-md-5 col-sm-5 col-xs-12 d-flex justify-content-between" >
                                        CATEGORÍAS
                                        <Icon 
                                            name="bars"
                                            color="black"
                                            onClick={ () => {
                                                this.handleItemClick()
                                            }}
                                        />
                                    </div>
                                    <div className="input-group col-lg-7 col-md-7 col-sm-7 col-xs-12">
                                        <Input icon='search' placeholder='Search...' style={{width: "100%"}} />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="d-flex align-items-center border justify-content-between m-1">
                                        <button className="btn btn-default bg-primary text-white"> 
                                            <Icon 
                                                name="cart"
                                            />
                                        </button>
                                        <p>TU CESTA <span className="cantidadCesta">3</span>  USD $ <span className="sumaCesta">20</span></p>	
                                    </div>
                                </div>
                            </div>
                            {activeItem ?
                                    <NavbarCateg onChange={this.handleItemClick} />   
                                : ''
                            }
                        </div>
                    </div>
            </Fragment>    
          )
  }
}

export default Nabvar;