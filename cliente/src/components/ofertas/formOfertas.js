import React, { Component, Fragment } from 'react'
import {Form, Checkbox, Select } from 'semantic-ui-react'
import { CATEGORYS_QUERY, PRODUCTOS_OFERTA_QUERY } from '../../queries'
import {Query } from 'react-apollo'
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import SelectInfo from './select'
import DateTimePicker from 'react-datetime-picker';

class FormOferta extends Component{
    state = {
        activo: (this.props.oferta)? this.props.oferta.activo:true,
        productos: '',
        categorias: '',
        fecha_inicio:  (this.props.oferta)? (this.props.oferta.fecha_inicio?new Date(Number(this.props.oferta.fecha_inicio)):null):null,
        fecha_fin: (this.props.oferta)?(this.props.oferta.fecha_fin)?new Date(Number(this.props.oferta.fecha_fin)):null:null,
        fecha_fin_min:  null,
        descuento:  (this.props.oferta)? this.props.oferta.descuento:null,
        id_descuento: (this.props.oferta)? this.props.oferta.id_descuento:null
    }
    options = async () =>{
        const values = await this.state;
        this.props.onChange(values)
    }
    addCategory = async  (option) =>{
       this.state.productos =  await this.selectProducts.selectedOpcionProduct(option);

    }
    addProducts = async (options) =>{
        if(!options){
            this.selectCategory.clearData();
        }else if(options.length < 1){
            this.selectCategory.clearData();
        } 
        this.state.productos =  await options;
    }
    returnOptions = () =>{
        return this.state;
    }
    render(){
        const {activo, fecha_inicio, fecha_fin, fecha_fin_min, id_descuento, descuento} =  this.state;
        return(
             <Fragment>
                 <Form onClick={this.options}>
                 <Checkbox checked={activo} 
                              toggle 
                              label="oferta desactiva/activa" 
                              className="col-md-12 d-flex justify-content-star direction"  
                              onClick={ () => { 
                                  this.setState({
                                      activo: !this.state.activo
                                  })
                              }}
                    />  
                    <p className="text-warning">escoja entre categorias o productos</p>
                    {!this.props.oferta?
                    <Form.Group>
                        <Query query={CATEGORYS_QUERY} >
                            {({loading, error, data}) =>{
                                 if(loading) return <Loading />;
                                 if(error) return <Error  error={error} />;
                                return ( 
                                        <SelectInfo 
                                               onClick={this.addCategory} 
                                               data={data.categorys} 
                                               multi={true} 
                                               disabledOptionChild={true}
                                               placeholderText={'seleccion categorias'}
                                               ref={instance => { this.selectCategory = instance; }}/>
                                )
                            }}      
                        </Query>
                        <Query query={PRODUCTOS_OFERTA_QUERY} >
                                {({loading, error, data}) =>{
                                    if(loading) return <Loading />;
                                    if(error) return <Error  error={error} />;
                                    return ( 
                                            <SelectInfo 
                                                 onClick={this.addProducts}  
                                                 data={data.products} 
                                                 multi={true}
                                                 placeholderText={'seleccion de productos'}
                                                 ref={instance => { this.selectProducts = instance; }}
                                            />
                                    )
                                }}
                        </Query> 
                    </Form.Group> : ''}
                </Form>
                <div className="d-flex ml-2" onClick={this.options}>
                                <div className="ml-2" style={{maxWidth:"220px"}}>                                  
                                    <label className="col-md-12">Fecha Inicio:</label>
                                    <DateTimePicker 
                                        placeholderText="Fecha de Inicio" 
                                        minDate={new Date()} 
                                        value={ fecha_inicio} 
                                        onChange={e=>{
                                            if(e !== null){
                                                if(this.state.fecha_fin){
                                                    if(e.getTime() > this.state.fecha_fin.getTime()){
                                                        this.setState({
                                                            fecha_fin: null
                                                        })
                                                    }
                                                }
                                                this.setState({
                                                    fecha_inicio: e,
                                                    fecha_fin_min: new Date(e.getTime() + 86400000)
                                                })
                                            }else{
                                                this.setState({
                                                    fecha_inicio: null,

                                                })
                                            }
                                        }}
                                    />
                                </div>
                                <div className="ml-2" style={{maxWidth:"220px"}}>
                                    <label className="col-md-12">Fecha fin:</label>
                                    <DateTimePicker 
                                        value={fecha_fin}
                                        placeholderText="Fecha final" 
                                        minDate={(fecha_fin_min) ? fecha_fin_min : new Date((new Date()).getTime() + 86400000)}
                                        onChange={e=>{
                                            this.setState({
                                                fecha_fin: e
                                            })
                                    }}
                                    />
                                </div>
                                <Form>
                                    <Form.Group>
                                        <Form.Field
                                            control={Select}
                                            options={[
                                                { key:'m' ,text: '%', value: 1 },
                                                { key:'f' ,text: '$', value: 2 },
                                            ]}
                                            onChange={ (e, data)=>{
                                                this.setState({
                                                    ...this.state,
                                                    id_descuento: data.value
                                                })
                                                this.options();
                                            }} 
                                            label={{ children: 'tipo de descuento', htmlFor: 'form-select-control-gender' }}
                                            placeholder='tipo de descuento'
                                            searchInput={{ id: 'form-select-control-gender' }}
                                            value={id_descuento?id_descuento:''}
                                                                               />
                                                                 
                                        <Form.Field 
                                              onChange={ (e, data)=>{
                                                  this.setState({
                                                      ...this.state,
                                                      descuento: e.target.value
                                                  })
                                                  this.options();
                                              }}
                                              disabled={(id_descuento) ? false : true}
                                              label='cantidad de descuento' 
                                              control='input' 
                                              type='number' 
                                              value={descuento? descuento: ''}
                                              error={(id_descuento == 1 && descuento > 100)?true: false }
                                              min={1} max={(id_descuento == 1 )? 100 : ''} 
                                        />
                                    </Form.Group>
                                </Form>
                        </div>
               
             </Fragment>
        )
    }
}

export default FormOferta;