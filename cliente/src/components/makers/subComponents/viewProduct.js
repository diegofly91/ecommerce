import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'
import {PRODUCTO_QUERY} from '../../../queries'
import Loading from '../../Alertas/loader'
import Error from '../../Alertas/Error'
import ViewProducts from './viewProducts'
import {direct} from '../../../index'
import{Icon, Button} from "semantic-ui-react"
import BoxAddCart from './boxAddCart'

class ViewProduct extends Component{
    state = {
        ruta: this.props.ruta,
        product: null,
        imgFull: null,
        zoom:{
            backgroundPosition: '0% 0%',
            backgroundImage: null,
            backgroundRepeat: 'no-repeat',
            width:"100%"
        },
        opacity: 1
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ruta: nextProps.ruta,
            cate: null,
            imgFull: null
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
        const {ruta, imgFull, zoom, opacity} = this.state;
        return(
         <Query query={PRODUCTO_QUERY} variables={{ruta}} fetchPolicy='network-only'  pollInterval={60000}>
               { ({loading, error, data}) =>{
                        // if(loading) return <Loading  />;
                        if(error) return <Error error={error} />;
                        return(
                            <Fragment>
                                 {data.product?
                                    <Fragment>
                                        <div className="row d-flex flex-wrap pt-3 pb-3" key={data.product.nombre}>
                                          <div className="col-md-1 d-flex flex-md-column justify-content-md-star  justify-content-sm-center p-0 mb-sm-2">
                                              {data.product.image.map( Img => {
                                                  return(
                                                        <img src={`${direct}${Img.imagen}`} 
                                                             key={Img.imagen} alt="" 
                                                             style={{cursor:"pointer",maxWidth:"80px", height:"auto"}}
                                                             className="img-thumbnail m-2"
                                                             onClick={ () => {
                                                                 this.setState({
                                                                     imgFull: Img
                                                                 })
                                                             }}
                                                        />                                             
                                                    )
                                              })}
                                          </div>  
                                          <div className="col-md-6 d-flex flex-column justify-content-star" style={{position:"relative"}}>
                                               <div 
                                                  style={zoom}
                                                  onMouseMove={ e => {
                                                    e.preventDefault();
                                                    const { left, top, width, height } = e.target.getBoundingClientRect();
                                                    const x = (e.pageX - left) / width * 100;
                                                    const y = (e.pageY - top) / height * 100;
                                                    const src = e.target.getAttribute("src");
                                                    this.setState({ zoom: {
                                                                      ...this.state.zoom,
                                                                      backgroundPosition: `${x}% ${y}%`,
                                                                      backgroundImage: `url(${src})`
                                                                    },
                                                                    opacity: 0 
                                                                  })
                                                 }} 
                                                 onMouseOut={
                                                     e => {
                                                        e.preventDefault();
                                                        this.setState({ opacity: 1})  
                                                     }
                                                 }
                                               >
                                                    { !imgFull ? data.product.image[0] !== undefined ?
                                                            <img src={`${direct}${data.product.image[0].imagen}`} style={{opacity, cursor: "zoom-in"}} alt="" className="d-block w-100"/> 
                                                            :  <img src={`${direct}/sin-img.jpg`}  alt="" className="d-block w-100"/>           
                                                        : <img 
                                                            src={`${direct}${imgFull.imagen}`}  
                                                            alt=""  
                                                            className="d-block w-100"
                                                            style={{opacity,cursor: "zoom-in"}}
                                                        />
                                                    }   
                                               </div> 
                                                {data.product.oferta?
                                                    data.product.oferta.activo?
                                                        <Icon 
                                                            name='star' 
                                                            color="red" 
                                                            size="massive"
                                                            style={{cursor:'pointer',position:"absolute",top:"8px",right:"14px", zIndex:2}}
                                                        >
                                                            <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontWeight:"600",fontSize:"23px",fontFamily:"arial", color:"#fff"}}> 
                                                                {data.product.oferta.typoDescuent.simbolo == "%" ? 
                                                                        `- ${data.product.oferta.descuento}${data.product.oferta.typoDescuent.simbolo}`:
                                                                        `- ${data.product.oferta.typoDescuent.simbolo}${data.product.oferta.descuento}`}
                                                            </span>
                                                        </Icon> 
                                                        :""
                                                :""}    
                                          </div>
                                          <div className="col-md-5 dflex flex-column" style={{position:"relative"}}>
                                                  <h1 className="text-muted text-uppercase">{data.product.nombre}</h1>
                                                  <p>{data.product.descripcion}</p>
                                                  <div className="pt-4 pb-4 d-flex">
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
                                                 <BoxAddCart product={data.product}/>
                                                          
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