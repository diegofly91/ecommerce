import React, {Fragment, Component} from 'react'
import {Query} from 'react-apollo'
import {PRODUCTS_CATEG_QUERY} from '../../../queries'
import Loading from '../../Alertas/loader'
import Error from '../../Alertas/Error'
import {Link} from 'react-router-dom'
import {direct} from '../../../index'
import Paginator from '../../layout/paginator'
import {Icon,Pagination} from 'semantic-ui-react'

class ViewProducts extends Component {
    limite = 3;
    state = {
        cate: this.props.data.cate,
        id_categoria: this.props.data.id_categoria,
        id_producto: this.props.data.id_producto? this.props.data.id_producto : null ,
        cantProducts: 0,
        paginator : {
            offset : 0,
            actual : 1
        }
    }
    pagNext = () => {
      this.setState({
             paginator: {
               offset: this.state.paginator.offset + this.limite,
               actual: this.state.paginator.actual + 1,  
             }
        })
    }
    pagPrev = () => {
     this.setState({
           paginator: {
             actual: this.state.paginator.actual - 1,  
             offset: this.state.paginator.offset - this.limite,
           }
     })
    }
    pagAct = (pag) => {
        this.setState({
            paginator:{
                actual: pag,
                offset: pag + this.limit
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            ruta: nextProps.data.ruta,
            cate: nextProps.data.cate,
            id_categoria: nextProps.data.id_categoria
        })
    }
    ofertaPrecio(simbol, precio, descuento){
       if(simbol.simbolo == "%"){
           let desc = descuento/100;
           let descPe = desc* precio;
           return precio-descPe;
       }else{
          return precio-descuento;
       }

    }
    render (){
        const { id_categoria, cate, id_producto } =  this.state;
        return( 
            <Fragment>
                { (cate && id_categoria !== "") ? 
                    <Query query={PRODUCTS_CATEG_QUERY} variables={{id_categoria, limit: this.limite, offset: this.state.paginator.offset, id_producto}} fetchPolicy="network-only">
                    { ({loading, error, data}) =>{
                       if(loading) return <Loading  />;
                        if(error) return <Error error={error} />;
                        this.state.cate = true;
                        this.state.products = data.productsCateg;
                        this.state.cantProducts = data.countProductsCat;
                        return (
                            <Fragment>
                            {id_producto && data.productsCateg.length> 0?<h3>PRODUCTOS RELACIONADOS</h3>:""}
                            <div className="d-flex flex-wrap">
                                {data.productsCateg.length > 0 ?  
                                    data.productsCateg.map(item => {
                                        return(
                                            <div className="col-md-3 p-2" key={item.id}>
                                             <Link to={`/Tienda/${item.ruta}`}>   
                                                <div className="card" style={{position:"relative"}}>
                                                    {item.image[0] !== undefined ?
                                                    <img src={`${direct}${item.image[0].imagen}`}  alt="" className="card-img-top"/> 
                                                    :  <img src={`${direct}/sin-img.jpg`}  alt="" className="card-img-top"/>           
                                                }
                                                    <div className="card-body">
                                                        <h4 className="card-title" style={{color:"#000"}}>{item.nombre}</h4>
                                                        <div className="card-text">
                                                            {item.oferta
                                                                         ?<div className="d-flex justify-content-center text-danger">
                                                                                 <span className="text-dark"style={{textDecorationLine:"line-through"}}>${item.precio } </span>
                                                                                 <span className="pl-2" style={{fontSize:"20px", fontWeight:"600"}}>
                                                                                  ${this.ofertaPrecio(item.oferta.typoDescuent,item.precio,item.oferta.descuento)}   
                                                                                 </span>
                                                                          </div>   
                                                                         :<div className="d-flex justify-content-center text-danger"
                                                                               style={{fontSize:"20px", fontWeight:"600"}}>
                                                                           ${item.precio}
                                                                          </div> 
                                                            }
                                                        </div>
                                                    </div>
                                                    {item.oferta?
                                                       item.oferta.activo?
                                                                <Icon 
                                                                    name='star' 
                                                                    color="red" 
                                                                    size="huge"
                                                                    style={{cursor:'pointer',position:"absolute",top:"4px",right:"-5px", zIndex:2}}
                                                                >
                                                                    <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontSize:"15px", color:"#fff"}}> 
                                                                     {item.oferta.typoDescuent.simbolo == "%" ? 
                                                                              `- ${item.oferta.descuento}${item.oferta.typoDescuent.simbolo}`:
                                                                              `- ${item.oferta.typoDescuent.simbolo}${item.oferta.descuento}`}
                                                                    </span>
                                                                </Icon> 
                                                                :""
                                                    :""}
                                                </div>
                                            </Link>
                                           </div>   
                                        )
                                    }): ''
                                }
                                {id_producto?"": 
                                <div className="d-flex justify-content-center col-12">
                                    <Paginator 
                                    total={data.countProductsCat} 
                                    actual={this.state.paginator.actual} 
                                    limite={this.limite} 
                                    pagNext={this.pagNext}
                                    pagPrev={this.pagPrev}
                                    pagAct={this.pagAct} />
                                </div>
                                }
                            </div>
                         </Fragment>
                        )
                        }}
                    </Query>            
                    :''}
            </Fragment>       
        )
    }
}

export default ViewProducts;