import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Animated from 'react-select/animated'

class SelectInfo extends Component{
    
    state = {
        data: this.props.data,
        multi: this.props.multi,
        options: null,
        disabledOptionChild: this.props.disabledOptionChild
    }
    clearData = () => {
         this.setState({
             ...this.state,
             options: null
         })
    }
    EliminarDetalle = i => () =>{
        this.setState({ details: this.state.details.filter((s, index) => i !== index)});
    }
    selectedOpcion = (options) => {
        if(this.state.disabledOptionChild){
            if(options){
                options.map((item) => {
                    this.state.data.map(item2 => {
                        if(item.id === item2.id_categoria){
                            if(!item2.disabled){
                                item2.disabled = !item2.disabled;
                            }
                        }
                    })
                })
           }else{
            this.state.data.map(item => {
                        item.disabled = false;
            })
           }
        }
        this.setState({
            options
        })
            
        this.props.onClick(options)
    }
    render(){
        const {data, multi,options, disabledOptionChild} = this.state;
        return (
            <Fragment>
                <Select 
                       onChange={ this.selectedOpcion }
                       options={data}  
                       isMulti={multi}
                       value={options}
                       components={Animated()}
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