const fs = require('fs');
const R = require('ramda');
const fileSpec = 'data09.txt';

fs.readFile(fileSpec, 'utf8', (err, data) => {

  // Parse data
  let items = R.split(' ', data);
  items = R.map(n => parseInt(n,10), items);
  
  let metadataSum = 0;
  
  const Node = data => {
    let childNodeCount = data[0];
    let metadataCount = data[1];
    let _data = R.takeLast(data.length-2, data);
    let nodes = [];
    let metadata = [];
  
    for (let cn=0; cn<childNodeCount; cn++) {
      let nodeData = Node(_data);
      _data = nodeData.data;
      nodeData = R.dissoc('data', nodeData);
      nodes.push(nodeData);
    }
    for (let mn=0; mn<metadataCount; mn++) {
      metadata.push(_data[mn]);
      metadataSum += _data[mn];
    }
    _data = R.takeLast(_data.length-metadataCount, _data);
    return {
      data: _data,
      nodes,
      metadata,
      getValue: () => {
        if (nodes.length === 0) {
          return R.reduce((acc, md) => acc + md, 0, metadata)
        } else {
          return R.reduce((acc, metadata) => {
            if (metadata <= nodes.length) {
              return acc + nodes[metadata-1].getValue()
            } else {
              return acc;
            }
          }, 0, metadata)
        }
      }
    }
  }
  
  let node = Node(items);
  console.log('Metadata sum: '+metadataSum);
  console.log('Root node value: '+node.getValue());

})