import React, { Component } from 'react'

export default class index extends Component {

    render() {
        return (
            <div dangerouslySetInnerHTML = {{ __html: "<pre><code>var x = 1234</code></pre>"}}>
                
            </div>
        )
    }
}
