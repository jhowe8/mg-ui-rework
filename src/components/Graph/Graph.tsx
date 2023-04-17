import React, { useRef, useEffect } from 'react'
import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape'
import CytoscapeComponent from 'react-cytoscapejs'
import dagre from 'cytoscape-dagre'


interface GraphProps {
  vertices: NodeDefinition[]
  edges: EdgeDefinition[]
}

cytoscape.use(dagre)

const Graph: React.FC<GraphProps> = ({ vertices, edges }) => {
  const cyRef = useRef<cytoscape.Core | null>(null)

  const layoutConfig = {
    name: 'dagre',
    avoidOverlap: true,
    edgeLength: 250,
    animate: false
  }

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.batch(() => {
        cyRef.current!.elements().remove()
        cyRef.current!.add([...vertices, ...edges])
      })

      const cyGraph = cyRef.current
      const layout = cyGraph.makeLayout(layoutConfig)
      layout.run()
      layout.on('layoutstop', () => {
        cyGraph.nodes().forEach((node) => {
          node.unlock()
        })
      })
    }
  }, [vertices, edges])

  const graphStyle: cytoscape.Stylesheet[] = [
    {
      selector: 'node',
      style: {
        'border-width': 3,
        'border-color': (ele: any) => {
          const property = ele.data('riskLevel')
          return property ? getColorFromProperty(property) : '#855'
        },
        label: 'data(displayLabel)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': 4,
        'font-weight': 'bold',
      },
    },
    {
      selector: 'edge',
      style: {
        'font-size': 5,
        label: 'data(displayLabel)',
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
      },
    },
  ]

  const getColorFromProperty = (riskLevel: number): string => {
    // Customize this function to map the property to a color
    if (riskLevel <= 25) return 'green'
    if (riskLevel < 50) return 'yellow'
    if (riskLevel < 75) return 'orange'
    if (riskLevel < 100) return 'red'
    return 'green'
  }

  return (
    <CytoscapeComponent
      elements={ vertices }
      stylesheet={ graphStyle }
      style={{ width: '100%', height: '100%', backgroundColor: '#EBEBEB', borderRadius: '25px'}}
      cy={(cy: any) => {
        cyRef.current = cy
      }}
      layout={layoutConfig}
    />
  )
}

export default Graph