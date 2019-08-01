import React, { Component, Fragment } from 'react';


class Home extends Component {
      state = {
          user: this.props.infoUsuario.mail 
      }
        render() {     
            const { user } = this.state;
            return(
                <Fragment>
                    <h2 className="text-center">Hola {user}</h2>
                </Fragment>
            )    
        }
}

export default Home;