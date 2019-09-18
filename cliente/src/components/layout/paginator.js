import React, { Component, useState, useEffect } from 'react'
// import {Icon, Button, Divider} from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'

// export const Paginator = ({total,actual,limite,pagNext,pagPrev, pagAct}) => {
//         const [paginas,] = useState(Math.ceil(Number(total) / limite));                       
//         return(
//             <div className="d-flex justify-content-center mt-3">
//                 <Pagination
//                     boundaryRange={0}
//                     defaultActivePage={actual}
//                     boundaryRange={0}
//                     siblingRange={1}
//                     totalPages={paginas}
//                     lastItem={false}
//                     firstItem={false}
//                     onPageChange= {(e, data)=>{
//                         pagAct(data.activePage)
//                         //pagAct(data.activePage)
                     
//                         // console.log(data.activePage)
//                     }}
//                 />
//             </div>
            
//         )                         
// }
class Paginator extends Component {
    state = {
         paginator : {
             paginas: Math.ceil(Number(this.props.total) / this.props.limite),
         }, 
         actual: this.props.actual 
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
          paginator:{
              paginas: Math.ceil(Number(nextProps.total) / nextProps.limite)
          },
          actual: nextProps.actual
        })
    }
    render(){
        const { paginas } = this.state.paginator;
        const { actual } = this.state;
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