import { map, zipObject } from 'lodash'
import type { CytoscapeOptions, ElementsDefinition } from 'cytoscape'
import type { Page } from './page'

export function input_to_cytoscape(input: Page[]): ElementDefinition[] {
  const edges: ElementDefinition[] = []
  const nodes: ElementDefinition[] = input.map((inp) => {
    if (inp.type === 'choice') {
      for (const itm of inp.choice) {
        edges.push({
          group: 'edges',
          data: { source: inp.path, target: itm.redirect },
        })
      }
    } else if (inp.type === 'text') {
      if (inp.redirect) {
        edges.push({
          group: 'edges',
          data: { source: inp.path, target: inp.redirect },
        })
      }
    }

    return {
      group: 'nodes',
      data: { id: inp.path, message: inp.message },
      scratch: { _message: inp.message },
      position: inp.position,
    }
  })
  return nodes.concat(edges)
}

export const input: Page[] = require("./input.json");


export function cytoscape_to_input(json: CytoscapeOptions): Page[] {
  const { edges, nodes }: ElementsDefinition = json.elements
  const nodes2 = zipObject(map(nodes, 'data.id'), nodes)
  return input.map((inp) => {
    inp.position = nodes2[inp.path].position
    return inp
  })
}
