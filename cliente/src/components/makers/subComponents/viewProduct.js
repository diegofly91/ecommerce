import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'
import {PRODUCTO_QUERY} from '../../../queries'
import Loading from '../../Alertas/loader'
import Error from '../../Alertas/Error'
import ViewProducts from './viewProducts'
import {direct} from '../../../index'
import{Icon} from "semantic-ui-react"

class ViewProduct extends Component{
    state = {
        ruta: this.props.ruta,
        product: null
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ruta: nextProps.ruta,
            cate: null
        })
    }
    ofertaPrecio(simbol, precio, descuento){
     
        if(simbol.simbolo === "%"){
            let desc = descuento/100;
            let descPe = desc* precio;
            return precio-descPe;
        }else{
           return precio-descuento;
        }
 
     }
    render(){
        const {ruta} = this.state;
        return(
         <Query query={PRODUCTO_QUERY} variables={{ruta}} fetchPolicy="network-only"  pollInterval={4000}>
               { ({loading, error, data}) =>{
                        if(loading) return <Loading  />;
                        if(error) return <Error error={error} />;
                        console.log(data.product)
                        return(
                            <Fragment>
                                 {data.product?
                                    <Fragment>
                                        <div className="row d-flex flex-wrap pt-3 pb-3">
                                          <div className="col-md-5 d-flex flex-column justify-content-center">
                                               {data.product.image[0] !== undefined ?
                                                    <img src={`${direct}${data.product.image[0].imagen}`}  alt="" className=""/> 
                                                    :  <img src={`${direct}/sin-img.jpg`}  alt="" className=""/>           
                                                }       
                                          </div>
                                          <div className="col-md-7 dflex flex-column" style={{position:"relative"}}>
                                                  <h1 className="text-muted text-uppercase">{data.product.nombre}</h1>
                                                  <p>{data.product.descripcion}</p>
                                                  <div>
                                                   {data.product.oferta
                                                        ? data.product.oferta.activo?<div className="d-flex justify-content-star text-danger mt-3 mb-3">
                                                                <span className="text-muted"style={{fontSize:"30px",textDecorationLine:"line-through"}}>${data.product.precio } </span>
                                                                <span className="pl-2" style={{fontSize:"34px", fontWeight:"600"}}>
                                                                ${this.ofertaPrecio(data.product.oferta.typoDescuent,data.product.precio,data.product.oferta.descuento)}   
                                                                </span>
                                                        </div> : 
                                                        <div className="d-flex justify-content-start text-danger"
                                                        style={{fontSize:"34px", fontWeight:"600"}}>
                                                    ${data.product.precio}
                                                    </div> 
                                                        :<div className="d-flex justify-content-start text-danger"
                                                            style={{fontSize:"34px", fontWeight:"600"}}>
                                                        ${data.product.precio}
                                                        </div> 
                                                    }
                                                 </div> 
                                                 {data.product.oferta?
                                                    data.product.oferta.activo?
                                                        <Icon 
                                                            name='star' 
                                                            color="red" 
                                                            size="huge"
                                                            style={{cursor:'pointer',position:"absolute",top:"4px",right:"-5px", zIndex:2}}
                                                        >
                                                            <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontSize:"15px", color:"#fff"}}> 
                                                                {data.product.oferta.typoDescuent.simbolo == "%" ? 
                                                                        `- ${data.product.oferta.descuento}${data.product.oferta.typoDescuent.simbolo}`:
                                                                        `- ${data.product.oferta.typoDescuent.simbolo}${data.product.oferta.descuento}`}
                                                            </span>
                                                        </Icon> 
                                                        :""
                                                :""}          
                                          </div> 

                                        </div> 
                                        <ViewProducts data={{cate:true, id_categoria:data.product.id_categoria, id_producto: data.product.id }}/>
                                    </Fragment>
                                   : ""
                                }
                            </Fragment>
                        )
               }}
         </Query>
        )
    }
}

export default ViewProduct;