import React, {  Fragment, Component } from 'react';
import {CATEGORYS_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import {Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Categorys extends Component {
    state = {
        categ : '',
        act: ''
    }
    render(){
        return(
            <Query query={CATEGORYS_QUERY} variables={{id_categoria: null}} >
                  {({loading, error, data}) =>{
                      if(loading) return "Cargando";
                      if(error) return `Error ${error}`;
                      this.state.categ = data.categorys;
                      const {categ} = this.state;
                      return (
                        <Fragment >
                            <div className="d-flex  justify-content-center flex-column  col-md-10 m-auto">
                               <h2> Listado de Categorias</h2>  
                                  <List>
                                    {categ.map( item => {
                                      return item.id_categoria === null 
                                       ?
                                        <List.Item 
                                            key={item.id}  
                                            style={{cursor:'pointer', marginTop:"10px"}}
                                        >
                                            <List.Icon name='folder' size="big" color={item.activo ? 'blue': 'red'}/>
                                            <List.Content className="align-bottom">
                                                <List.Header className="mt-2">
                                                    <span    
                                                       onClick={ e => {
                                                            this.setState({
                                                                 act: (this.state.act == item.id) ? '': item.id
                                                            })
                                                        } 
                                                        }  
                                                       className="mr-3"
                                                       data-toggle="tooltip" data-placement="top" title="ver mas"
                                                    >
                                                      {item.nombre}
                                                    </span> 
                                                    <Link to={`/categoria/editar/${item.id}`}><Icon  circular name="edit outline" color="blue" className="mr-2" /></Link>
                                                </List.Header>
                                                
                                                 {   this.state.act == item.id ? 
                                                     <Box id={item.id} /> 
                                                                : 
                                                    ''
                                                 }
                                            </List.Content>
                                        </List.Item>
                                        : '';
                                        }
                                    )}
                                </List>
                                <List.Item>
                                     <Link to={`/categoria/nueva`}>
                                            <Icon 
                                                name='plus circle' 
                                                color="black" 
                                                size="big" 
                                                style={{cursor:'pointer'}}
                                            />
                                    </Link>
                                </List.Item>
                            </div> 
                        </Fragment>  
                      );
                    }  
                    }     
                </Query>  
        )}
}  

class Box extends Component {
    state = {
        id: this.props.id, 
    }
    render(){
        const { id } = this.state;
        return (
            <Query query={CATEGORYS_QUERY} variables={{id_categoria: id}} >
            {({loading, error, data}) =>{
                if(loading) return "Cargando";
                if(error) return `Error ${error}`;
                return (
                    <List.List className="mt-2"> 
                            {data.categorys.map( itemS  => {
                                return id == itemS.id_categoria ?
                                    <List.Item key={itemS.id} className="mt-2">
                                        <List.Icon name='folder' size="large"  color={itemS.activo ? 'blue': 'red'}/>
                                        <List.Content>
                                            <List.Header className="mt-2"><Link  to={`/categoria/editar/${itemS.id}`}>{itemS.nombre}</Link></List.Header>
                                        </List.Content>
                                    </List.Item> : '';
                            })} 
                            <List.Item className="mt-2">
                                <Icon 
                                    name='plus circle' 
                                    color="black" 
                                    size="large" 
                                    style={{cursor:'pointer'}}
                                />
                            </List.Item>
                    </List.List>           
            )}}  
           </Query>
        )
    }
}
 export default Categorys;