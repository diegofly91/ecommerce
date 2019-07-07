import React, { Component } from 'react'

export default class FormDetails extends Component {
     state = { 
              details :  this.props.details,
              focusOpc: false,
              focusDet: false
             };
            
             detallesFinal = () => {
                return this.state.details;
            }

            nuevoDetalle = () => {
                this.setState({
                               details: this.state.details.concat([{name:'', values: [{value:''}]}]),
                               focusOpc: false,
                               focusDet:true  
                              });
            }
            nuevaOpcion = i => () =>{
                    const newOpc = this.state.details.map((input, index) => {
                            if (i !== index) return input
                            else{
                                input.values = input.values.concat({value:""});
                                return input;
                            }
                    });
                    this.setState({ 
                                   details: newOpc,
                                   focusOpc: true,
                                   focusDet:false  
                                  });
            }
            EliminarDetalle = i => () =>{
                this.setState({ details: this.state.details.filter((s, index) => i !== index)});
            }
            EliminarOpcion =  (detIndex, opcIndex ) => () =>{
                const removeOpc  = this.state.details.map((input, index) => {
                    if (detIndex !== index) return input
                    else{
                        input.values =  input.values.filter((s,i)=> i !== opcIndex);
                        return input;
                    }
                 });
                 this.setState({ details: removeOpc });
            }
            leerDetalle = i => e =>{
                const nuevoDetalle = this.state.details.map((input, index) => {
                    if (i !== index) return input
                    else{
                        input.name =   e.target.value;
                        return input;
                    }
                });
                this.setState({ details : nuevoDetalle });
            }
            leerOpcion = (detIndex, opcIndex) => e =>{
                const newOpc = this.state.details.map((input, index) => {
                    if (detIndex !== index) return input
                    else{
                        input.values.map((data,i)=>{
                            if(opcIndex !== i) return data
                            else{
                                data.value = e.target.value
                                return data
                            }
                        })
                        return input;
                    }
                    
                });
                this.setState({ details: newOpc });
            }
        
    render() {
        const divStyle = {
                          width: '18rem',
                         };       
        const  { details } = this.state;
        return (
            <div className="border border-primary col-md-12 p-1 mt-2" >
                <div className="d-flex justify-content-around flex-warp bg-light p-3">
                       <h4 className="text-primary pr-2"> Detalles producto </h4>
                       <button 
                            type="button"
                            className="btn btn-success"
                            onClick={this.nuevoDetalle}
                       >Agregar Detalle</button>
                </div>
                <div className="d-flex justify-content-around flex-wrap">
                    
                        {details.map((input,index) => (
                                <div className="card m-2" style={divStyle} key={index}>
                                    <div className="card-header bg-secondary">
                                    <div className="input-group">
                                                <input 
                                                      type="text" 
                                                      className="form-control" 
                                                      value={input.name}
                                                      placeholder="nombre"
                                                      autoFocus={this.state.focusDet}
                                                      onChange={this.leerDetalle(index)} 
                                                /> 
                                                <div className="input-group-append">
                                                    <button 
                                                           className="btn btn-danger" 
                                                           type="button" 
                                                           onClick={this.EliminarDetalle(index)}
                                                    > 
                                                        &times; Eliminar
                                                    </button>
                                                </div>
                                        </div>  
                                    </div>
                                    <ul className="list-group list-group-flush">
                                            {input.values.map((input2,i) => (
                                                <li className="list-group-item align-item-rigth" key={i}>
                                                    <div className="input-group">
                                                            <input type="text" 
                                                                   className="form-control" 
                                                                   value={input2.value}
                                                                   placeholder="opcion"
                                                                   autoFocus={this.state.focusOpc}
                                                                   onChange={this.leerOpcion(index, i)}  
                                                            />  
                                                            <div className="input-group-append">
                                                                <button 
                                                                    className="btn btn-danger" 
                                                                    type="button"
                                                                    onClick={this.EliminarOpcion(index,i)} 
                                                                > 
                                                                             &times; Eliminar
                                                                </button>
                                                            </div>
                                                        </div>                             
                                                    </li>
                                            ))}        
                                    </ul>
                                    <div className="car-footer">
                                    <button 
                                        onClick={this.nuevaOpcion(index)}
                                        type="button" 
                                        className="btn btn-success m-2"
                                    >+ Agregar Opcion</button>
                                    </div>
                                </div>
                        ))}
                </div>
            </div>
        )
    }
}
