import Graph from './components/Graph/Graph'
import './App.css'
import { EdgeDefinition, NodeDefinition } from 'cytoscape'
import Dropdown from './components/SearchBar/Dropdown'

function App() {
  const vertices: NodeDefinition[] = [
    { data: { id: 'hufflepuff', displayLabel: 'Hufflepuff', riskLevel: 10 } },
    { data: { id: 'ravenclaw', displayLabel: 'Ravenclaw', riskLevel: 30 } },
    { data: { id: 'gryffindor', displayLabel: 'Gryffindor', riskLevel: 30 } },
    { data: { id: 'cho-chang', displayLabel: 'Cho Chang', riskLevel: 60 } },
    { data: { id: 'cedric-diggory', displayLabel: 'Cedric Diggory', riskLevel: 80 } },
    { data: { id: 'harry-potter', displayLabel: 'Harry Potter', riskLevel: 80 } },
    { data: { id: 'triwizard-tournament', displayLabel: 'Triwizard Tournament', riskLevel: 80 } },
    { data: { id: 'luna-lovegood', displayLabel: 'Luna Lovegood', riskLevel: 80 } }
  ]
  const edges: EdgeDefinition[] = [
    { data: { source: 'cho-chang', displayLabel: 'BelongsTo', target: 'ravenclaw' } },
    { data: { source: 'cedric-diggory', displayLabel: 'BelongsTo', target: 'hufflepuff' } },
    { data: { source: 'luna-lovegood', displayLabel: 'BelongsTo', target: 'ravenclaw' } },
    { data: { source: 'harry-potter', displayLabel: 'BelongsTo', target: 'gryffindor' } },
    { data: { source: 'harry-potter', displayLabel: 'ParticipatedIn', target: 'triwizard-tournament' } },
    { data: { source: 'cedric-diggory', displayLabel: 'ParticipatedIn', target: 'triwizard-tournament' } },
  ]

  return (
  <div id='parent' className='container'>
    <header>
      <div id="searchBar">
        <Dropdown menu={['a', 'b', 'c']} />
        <input id="search-bar" placeholder="Search" type="search" />
        <input id="submit" type="submit" value="Search" />
      </div>
    </header>
    <div className='data-display-container'>
      <div className='graph-container'>
        <Graph vertices={vertices} edges={edges} />
      </div>
      <div className='map-node-container'>
        <div className='map-container'></div>
        <div className='nodes-container'></div>
      </div>
    </div>
  </div>
)}

export default App
