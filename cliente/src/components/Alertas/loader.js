import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'


 const Loading = () => {
    return (
        <Segment>
            <Dimmer active>
                <Loader content='Loading' />
            </Dimmer>
        </Segment>
    )
}
export default Loading;