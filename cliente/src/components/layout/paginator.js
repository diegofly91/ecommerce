import React, { Component } from 'react'
// import {Icon, Button, Divider} from 'semantic-ui-react'

class Paginator extends Component {
    state = {
         paginator : {
             paginas: Math.ceil(Number(this.props.total) / this.props.limite),
         } 
    }
    render(){
        const { paginas } = this.state.paginator;
        const { actual } = this.props;
        const btnPrev = (actual > 1) 
                                ?  <button className="ui icon left labeled button mb-3" onClick={this.props.pagPrev}>
                                        <i aria-hidden="true" className="left arrow icon"></i>
                                        Prev                                        
                                    </button>
                                : '';
        const btnNext = (actual < paginas )
                                 ?  <button className="ui icon right labeled button mb-3"  onClick={this.props.pagNext}>
                                         Next                                         
                                       <i aria-hidden="true" className="right arrow icon"></i>
                                    </button>
                                 : '';

        return(
          <div className="d-flex justify-content-center mt-3">
              {btnPrev}
              {btnNext}

          </div>
         
        )
    }
}

export default Paginator;