import React from 'react'
import UseFireStore from './UseFireStore'

function ImageGrid() {
    const {docs} = UseFireStore('images');
    return (
        <div>
          {docs&&docs.map(doc=>(
              <div key={doc.id}>
<img src={doc.url} style={{width:"200px"}}/>
              </div>
          ))}
        </div>
    )
}

export default ImageGrid
