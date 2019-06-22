import React, { Component } from 'react'
import { format } from 'timeago.js'
import  FormDetails  from './subCompFormProducts/formDetails';
import FormCategory from './subCompFormProducts/formCategory';
import FormImage from './subCompFormProducts/formImage';

class FormProduct extends Component {
    
    state = { 
        product: this.props.product,
        details: (this.props.product.detalles !== "" ) ? JSON.parse(this.props.product.detalles): [],
    } 

    info = e =>{
        e.preventDefault();
        console.log("categoria:",this.childCategory.detallesFinal())
        this.setState({  
                        product:{
                            ...this.state.product,
                            id_categoria : this.childCategory.detallesFinal(),
                            detalles: JSON.stringify(this.childDetails.detallesFinal())
                        },
                        details:this.childDetails.detallesFinal()
                     })

    }
    render() {
        const { nombre, ruta, fecha, precio, id, titulo1, descripcion, vistas, cantidad, id_categoria, image, id_tipo, id_genero } = this.state.product;
        const { details } = this.state;
        const divStyle = {
            width: '13rem',
           }; 
        return (
                 <form onSubmit={e=>{
                     e.preventDefault(); this.child.detallesFinal(); 
                 }}>
                     <div className="card text-center">
                            <div className="card-header">
                                <h2 className="d-flex flex-wrap justify-content-around">
                                    <span>Editar Producto: </span> 
                                    <span className="text-primary">{nombre}</span> 
                                </h2>      
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap  mb-2">
                                    <h4 className="text-primary col-md-4">Nombre:</h4>
                                    <input autoFocus
                                          type="text" 
                                          className="form-control col-md-6" 
                                          defaultValue={nombre}
                                          onChange={e =>{
                                               this.setState({
                                                   product:{
                                                       ...this.state.product,
                                                       nombre: e.target.value
                                                   }
                                               })
                                          }}
                                    />
                                </div>
                                <div className="d-flex flex-wrap  mb-2">
                                     <h4 className="text-primary col-md-4">Titulo:</h4>
                                     <textarea 
                                            className="form-control col-md-8" 
                                            defaultValue={titulo1} 
                                            onChange={e =>{
                                                this.setState({
                                                    product:{
                                                        ...this.state.product,
                                                        titulo1: e.target.value
                                                    }
                                                })
                                           }}
                                            rows="1" />
                                </div>
                                <div className="d-flex flex-wrap">
                                     <h4 className="text-primary  col-md-4">descripción:</h4>
                                     <textarea 
                                              className="form-control col-md-8" 
                                              defaultValue={descripcion} rows="2"
                                              onChange={e =>{
                                                this.setState({
                                                    product:{
                                                        ...this.state.product,
                                                        descripcion: e.target.value
                                                    }
                                                })
                                           }}
                                     />
                                </div>
                                <div className="d-flex flex-wrap justify-content-start p-0 m-3">
                                    <FormCategory id={id_categoria}  ref={instance => { this.childCategory = instance; }}/>
                                    <div className="">

                                    </div>
                                    
                                    <div className="col-md-2">
                                        <h4 className="text-primary">Precio:</h4>
                                        <  input 
                                                type="number"
                                                className="form-control col-md-12" 
                                                style={divStyle}
                                                defaultValue={precio} 
                                                onChange={e =>{
                                                    this.setState({
                                                        product:{
                                                            ...this.state.product,
                                                            precio: e.target.value
                                                        }
                                                    })
                                            }}
                                        />    
                                    </div>
                                    <div className="col-md-2">
                                        <h4 className="text-primary">Cantidad:</h4>
                                        <  input 
                                                type="number"
                                                className="form-control col-md-12" 
                                                style={divStyle}
                                                defaultValue={cantidad} 
                                                onChange={e =>{
                                                    this.setState({
                                                        product:{
                                                            ...this.state.product,
                                                            cantidad: e.target.value
                                                        }
                                                    })
                                            }}
                                        />    
                                    </div>
                                    <div className="col-md-auto">
                                        <h4 className="text-primary">Tipo:</h4>
                                        <select 
                                                className="form-control"
                                                value={id_tipo}
                                                onChange={e =>{
                                                    this.setState({
                                                        product:{
                                                            ...this.state.product,
                                                            id_tipo: e.target.value
                                                        }
                                                    })
                                               }}
                                        >
                                            <option value="1">FISICO</option>
                                            <option value="2">VIRTUAL</option>
                                        </select>  
                                    </div>
                                    <div className="col-md-auto">
                                        <h4 className="text-primary">Genero:</h4>
                                        <select 
                                                className="form-control"
                                                value={id_genero}
                                                onChange={e =>{
                                                    this.setState({
                                                        product:{
                                                            ...this.state.product,
                                                            id_genero: e.target.value
                                                        }
                                                    })
                                               }}
                                        >
                                            <option value="1">MASCULINO</option>
                                            <option value="2">FEMENINO</option>
                                            <option value="3">UNISEX</option>
                                            <option value="4">OTROS..</option>
                                        </select>  
                                    </div>
                                    <FormDetails details={details}  ref={instance => { this.childDetails = instance; }} />
                                    <FormImage image={image}  id={id}/>
                                </div>
                                
                                <button 
                                       className="btn btn-primary mt-2 mx-right btn-block" 
                                       key={id}
                                       onClick={this.info}
                                >
                                    Editar Producto
                                </button>
                            </div>
                            <div className="card-footer text-muted d-flex justify-content-between mb-5">
                               <span>Editado: {format(fecha)}</span>   <span>visto: {vistas}</span>   <span className="mr-2">{`ruta:  /${ruta}`}</span>
                            </div>
                           
                     </div>
                </form>   
        )
    }
}

export default FormProduct