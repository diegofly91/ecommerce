import React, { Component, Fragment } from 'react';
import {CATEGORYS_QUERY} from '../../queries';
import { Query } from 'react-apollo';

export class FormCategory extends Component {
     state = { 
             id_product: this.props.id,
             info_categor: []
     }
     leerCategoria = (id_product, categorys) => {
            let cate;
            categorys.map(item =>{
                            if(item.id == id_product) {
                                cate = item;
                            }
                    
            })
            this.state.info_categor = cate; 
     }
     detallesFinal = () => {
        return this.state.id_product;
    }
     render() {
       const { id_product } = this.state;
       const divStyle = {
        width: '18rem',
       };       
        return (
            <Fragment>
                <Query query={CATEGORYS_QUERY} >
                      {({loading, error, data}) =>{
                          if(loading) return "Cargando";
                          if(error) return `Error ${error}`;
                          this.leerCategoria(id_product, data.category)
                          return ( 
                                    <div className="ml-2 mr-2" style={divStyle}>
                                        <h4 className="text-primary ml-2">Categoria:</h4>
                                        <select 
                                                className="form-control"
                                                value={
                                                    this.state.info_categor.id_categoria !== null 
                                                    ? this.state.info_categor.id_categoria
                                                    : this.state.id_product
                                                }
                                                onChange={  e=>{
                                                            this.setState({
                                                                id_product: e.target.value
                                                            })
                                                        }
                                                }
                                        >
                                                {data.category.map( item => {
                                                    return item.id_categoria === null 
                                                    ?
                                                    <option 
                                                            value={item.id} 
                                                            key={item.id}
                                                    >
                                                        {item.nombre}
                                                    </option>
                                                    : ''
                                                })}
                                        </select>
                                        <h4 className="text-primary mr-2">Subcategoria:</h4>
                                        <select 
                                                className="form-control"
                                                value={
                                                    this.state.info_categor.id_categoria !== null 
                                                    ? this.state.info_categor.id
                                                    : ''
                                                }
                                                onChange={e=>{
                                                            this.setState({
                                                                id_product: e.target.value,
                                                            })
                                                        }
                                                }
                                        >
                                            { this.state.info_categor.id_categoria == null 
                                            ? <option value=""></option>
                                            : ''
                                            } 
                                            {data.category.map( item => {
                                                return item.id_categoria === this.state.info_categor.id_categoria && 
                                                    this.state.info_categor.id_categoria !== null
                                                ?
                                                <option 
                                                    value={item.id} 
                                                    key={item.id}
                                                >
                                                    {item.nombre}
                                                </option>
                                                :
                                                    item.id_categoria == this.state.id_product
                                                    ? 
                                                    <option 
                                                        value={item.id} 
                                                        key={item.id}
                                                    >
                                                    {item.nombre}
                                                    </option>
                                                    : ''
                                            })}
                                        </select>
                                    </div>
                          );
                      }}
                </Query>
               
            </Fragment>    
        )
    }
}

export default FormCategory