import React, { Component } from 'react'
import AticleTitle from '../../components/AticleTitle'

export default class index extends Component {

    render() {
        return (
            <div>
                <AticleTitle></AticleTitle>
                <div dangerouslySetInnerHTML = {{ __html: "<pre><code>var x = 1234</code></pre>"}}>
                    
                </div>
            </div>
        )
    }
}
