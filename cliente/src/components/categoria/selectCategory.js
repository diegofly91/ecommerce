import React , {Fragment, Component } from 'react'
import {CATEGORYS_QUERY} from '../../queries'
import { Query } from 'react-apollo'

class SelectCategory extends Component {
        state= {
                id_categoria: this.props.id_categoria
        }
        selectCategory = () => {
            return this.state.id_categoria;
        }
        render(){
            const {id_categoria} = this.state;
            return (
                <Fragment>
                    <Query query={CATEGORYS_QUERY} >
                        {({loading, error, data}) =>{
                            if(loading) return "Cargando";
                            if(error) return `Error ${error}`;
                            return ( 
                                <div className="m-0 p-0 col-md-6">
                                    <label className="m-0 p-0 mb-2" style={{fontWeight:"700", fontSize:"0.9em"}}>categoria</label>
                                    <select 
                                        className="form-control"
                                        value={id_categoria}
                                        onChange={  e=>{
                                            this.setState({
                                                id_categoria: Number(e.target.value)
                                            })
                                        }}
                                    >
                                        {data.categorys.map( item => {
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
                                </div>  
                            )
                        }}
                    </Query>
                </Fragment>  
            )
        }
}

export default SelectCategory