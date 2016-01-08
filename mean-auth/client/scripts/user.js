var edges = [
    {id: 1, from: 0, to: 1, label: 'Start'},
    {id: 2, from: 1, to: 3, label: 'Yes'},
    {id: 3, from: 1, to: 2, label: 'No'},
    {id: 4, from: 2, to: 5, label: 'Resolved'},
    {id: 5, from: 2, to: 4, label: 'Not resolved'},
    {id: 6, from: 3, to: 6, label: 'Resolved'},
    {id: 7, from: 3, to: 7, label: 'Not resolved'},
];

var nodes = [
    {id: 0, label: 'Duplicate Site Node ID', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dolor erat. Cras ac commodo metus. Aenean porta dictum dapibus. Sed vel risus turpis. Ut nec posuere eros, in elementum est. Proin eget leo quis nisl sollicitudin ornare in ac justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed a ornare felis, sed tempus nisl. Nam ac nisl vitae nisi sagittis congue vitae ut dui. In nulla ex, maximus eu tempor in, bibendum a."},
    {id: 1, label: 'Is this the correct site?', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dolor erat. Cras ac commodo metus. Aenean porta dictum dapibus. Sed vel risus turpis. Ut nec posuere eros, in elementum est. Proin eget leo quis nisl sollicitudin ornare in ac justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed a ornare felis, sed tempus nisl. Nam ac nisl vitae nisi sagittis congue vitae ut dui. In nulla ex, maximus eu tempor in, bibendum a."},
    {id: 3, label: 'Remove the node from the incorrect site, then try again.', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dolor erat. Cras ac commodo metus. Aenean porta dictum dapibus. Sed vel risus turpis. Ut nec posuere eros, in elementum est. Proin eget leo quis nisl sollicitudin ornare in ac justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed a ornare felis, sed tempus nisl. Nam ac nisl vitae nisi sagittis congue vitae ut dui. In nulla ex, maximus eu tempor in, bibendum a."},
    {id: 2, label: 'Remove the node from this site.', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dolor erat. Cras ac commodo metus. Aenean porta dictum dapibus. Sed vel risus turpis. Ut nec posuere eros, in elementum est. Proin eget leo quis nisl sollicitudin ornare in ac justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed a ornare felis, sed tempus nisl. Nam ac nisl vitae nisi sagittis congue vitae ut dui. In nulla ex, maximus eu tempor in, bibendum a."},
    {id: 5, label: 'Problem resolved.', description: ""},
    {id: 4, label: 'Open a support ticket.', description: ""},
    {id: 7, label: 'Open a support ticket.', description: ""},
    {id: 6, label: 'Problem resolved.', description: ""}
];

function getNode(node) {
	if(typeof node !== 'undefined') {
		if(typeof node ==="number") {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].id == node) {
					return nodes[i]
				}
			}
			return {};
		} else {
			throw new Error('getNode only accepts a number.');
		}
	} else {
		return nodes[0];
	}
}

function getEdges(node) {
	if(typeof node !== 'undefined') {
		if(typeof node ==="number") {
			var ans = []
			for (var i = 0; i < edges.length; i++) {
				if (edges[i].from == node) {
					ans.push(edges[i]);
				}
			}
			return ans;
		} else {
			throw new Error('getEdges only accepts a number.');
		}
	} else {
		var ans = []
		for (var i = 0; i < edges.length; i++) {
			if (edges[i].from == 0) {
				ans.push(edges[i]);
			}
		}
		return ans;
	}
}