import $ from 'jquery';
import cytoscape, { ElementDefinition } from 'cytoscape';
import { input, input_to_cytoscape, cytoscape_to_input } from './input'

$(document).ready(async function main() {
  const cy = cytoscape({
    pixelRatio: "auto",
    container: document.getElementById('root'),
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(message)',
          'font-family': '"Kanit", sans-serif'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ]
  });

  cy.add(input_to_cytoscape(input));
  cy.nodes().on('dragfree', function(e){
    console.log(JSON.stringify(cytoscape_to_input(cy.json())));
  });
  
});
