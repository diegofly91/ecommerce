import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Animated from 'react-select/animated'

class SelectInfo extends Component{
    
    state = {
        data: this.props.data,
        multi: this.props.multi,
        options: null,
        disabledOptionChild: this.props.disabledOptionChild,
        placeholderText: this.props.placeholderText

    }
    clearData = () => {
         this.setState({
             ...this.state,
             options: null
         })
    }
    selectedOpcionProduct = async (categorys)=>{
        this.setState({
            ...this.state,
            options: null
        })
        if(categorys){
                let newOpc = [];  
                await categorys.map( categ =>{
                        if(categ.subcategory.length > 0){
                            categ.subcategory.map(subc => {
                                    this.state.data.map(prod => {
                                        if(prod.id_categoria === subc.id ){
                                            newOpc.push(prod)
                                        }
                                    })
                            })                    
                        }
                        this.state.data.map(prod => {
                            if(prod.id_categoria === categ.id ){
                                newOpc.push(prod)
                            }
                        })
                })
                this.setState({
                    ...this.state,
                    options: newOpc
                })              
                return this.state.options;  
         }
    }
    selectedOpcion = (options) => {
        if(this.state.disabledOptionChild){
            if(options){
                this.state.data.map(item2 => {
                        item2.disabled = false;
                })
                options.map((item) => {
                    this.state.data.map(item2 => {
                        if(item.id === item2.id_categoria){
                            item2.disabled = true;
                        }
                    })
                })

           }
        }
        this.setState({
            options
        }) 
        this.props.onClick(options)
    }
    render(){
        const {data, multi,options, disabledOptionChild, placeholderText} = this.state;
        return (
            <Fragment>
                <Select 
                       onChange={ this.selectedOpcion }
                       options={data}  
                       isMulti={multi}
                       value={options}
                       components={Animated()}
                       placeholder={placeholderText}
                       getOptionValue={ (options) => options.id}
                       getOptionLabel={ (options) => options.nombre}
                       isOptionDisabled={(option) => (option.disabled  && disabledOptionChild)}
                       className="col-md-6 m-2"
                />
            </Fragment>
        )
    }

}

export default SelectInfo;