var loginApp = angular.module('loginApp');

loginApp.factory('treeFactory', function () {
    var factory = {};
    
    factory.addNode = function () {
        try {
            this.node = {id: this.nodeId, label: this.nodeLabel};
            this.edge = {id: edges.length + 1, from: this.parentNodeId, to: this.node.id, label: this.edgeLabel};
            
            nodes.add(this.node);
            edges.add(this.edge);
            
            this.nodes = nodes.get();
            this.edges = edges.get();
           
            this.nodeId = this.nodeLabel = this.edgeLabel = this.parentNodeId =  '';
        }
        catch (err) {
            alert('factory: ' + err);
        }
    };
    
    factory.updateNode = function () {
        try {
            this.node = {id: this.nodeId, label: this.nodeLabel};
            nodes.update(this.node);
            
            this.nodes = nodes.get();
            this.edges = edges.get();
            
            this.nodeId = this.nodeLabel = this.edgeLabel = '';
        }
        catch (err) {
            alert('factory: ' + err);
        }
    };
    
    factory.deleteNode = function () {
        try {
            this.node = {id: this.nodeId, label: this.nodeLabel};
            nodes.remove(this.node);
            
            this.nodes = nodes.get();
            this.edges = edges.get();
            
            this.nodeId = this.nodeLabel = this.edgeLabel = '';
            
        } 
        catch (err) {
            alert('factory: ' + err);
        }
    };
    return factory;
});