var nodes = new vis.DataSet([
    {id: 0, label: 'Duplicate Site Node ID'},
    {id: 1, label: 'Is this the correct site'},
    {id: 3, label: 'Remove the node from the incorrect site\n and try again'},
    {id: 2, label: 'Remove the node from this site'},
    {id: 5, label: 'Problem resolved'},
    {id: 4, label: 'Open a support ticket'},
    {id: 7, label: 'Problem resolved'},
    {id: 6, label: 'Open a support ticket'}
    
]);

// create an array with edges
var edges = new vis.DataSet([
    {id: 1, from: 0, to: 1},
    {id: 2, from: 1, to: 3, label: 'yes'},
    {id: 3, from: 1, to: 2, label: 'no'},
    {id: 4, from: 2, to: 5, label: 'resolved'},
    {id: 5, from: 2, to: 4, label: 'not resolved'},
    {id: 6, from: 3, to: 6, label: 'resolved'},
    {id: 7, from: 3, to: 7, label: 'not resolved'},
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
    "nodes": {
        "borderWidthSelected": 1,
        "color": {
          "border": "rgba(42,116,233,1)"
        },
        "shape": "box",
        "size": 36
      },
      "edges": {
        "arrows": {
          "to": {
            "enabled": true
          }
        },
        "font": {
          "align": "middle"
        },
        "scaling": {
          "max": 25
        },
        "smooth": {
          "type": "horizontal",
            "forceDirection": true
        }
      },
    manipulation: {
        enabled: false,
        initiallyActive: true,
        addNode: true,
        addEdge: true,

        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle:{
          // all node options are valid.
        }
      },
    layout: {
        randomSeed: 828418,
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            levelSeparation: 200,
            direction: 'UD',
            sortMethod: 'directed'
        }  
    },
    physics: {
        enabled: true,
        repulsion: {
          centralGravity: 0.1,
          springLength: 100,
          springConstant: 0.05,
          nodeDistance: 300,
          damping: 0.09
        },
        hierarchicalRepulsion: {
          centralGravity: 0.2,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 200,
          damping: 0.09
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: 'barnesHut',
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 100,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);
var order = [];


function addNode(node) {
    try {
        nodes.add(node);
    }
    catch (err) {
        alert(err);
    }
}

function addEdge (edge) {
    try {
        edges.add(edge);
    }
    catch (err) {
        alert(err);
    }
}

/* Recursive method to delete the given node and all
of that node's children */
function deleteNode(node) {
    /* Recursively remove the children */
    var left = getLeftChild(node.id);
    //console.log('left: ' + left);
    
    var right = getRightChild(node.id);
    //console.log('right: ' + right);
    
    edges.forEach(function(edge) {
        if (edge.from == node.id) {
            edges.remove(edge);
        }
    });
    
    /* Recurse down the sub-trees */
    if (typeof left !== 'undefined') {
        deleteNode(left);
    }
    if (typeof right !== 'undefined') {
        deleteNode(right);
    }
    try {
       // console.log('Deleting node: ' + node.id);
        nodes.remove(node.id);
        return;
    }
    catch (err) {
        alert(err);
    }
}

function deleteEdge(edge) {
    try {
        edges.remove(edge.id);
    }
    catch (err) {
        alert(err);
    }
}

function isLeaf(nodeId) {
    if (typeof getLeftChild(nodeId) === 'undefined' && typeof getRightChild(nodeId) === 'undefined') {
        return true;
    }
    return false;
}

function getLeftChild(nodeId) {
    return nodes._data[2 * nodeId];
}

function getRightChild(nodeId) {
    return nodes._data[2 * nodeId + 1];
}

function preorder(node) {
    if (typeof node === 'undefined') {
        return undefined;
    }
    order.push(node);
    preorder(getLeftChild(node.id));
    preorder(getRightChild(node.id));
}