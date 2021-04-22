import React, { useEffect, useState } from 'react';
import './css/util.css';
import { fetchKnowledgeBlockData } from './actions';
import { KnowledgeBlock, KnowledgeBlockData } from './components';

interface ApplicationState {
  loading: boolean;
  knowledgeBlocksData: KnowledgeBlockData[];
}

function App() {
  useEffect(() => {
    fetchKnowledgeBlockData()
    .then(data => {

      setState(prevState => {
        return {
          ...prevState,
          knowledgeBlocksData: [ ...prevState.knowledgeBlocksData, ...data ],
          loading: false
        }
      });

    })
    .catch(console.log) //TODO: Handle errors properly
  }, []);

  const [ state, setState ] = useState<ApplicationState>({
    knowledgeBlocksData: [],
    loading: true
  });

  return (
    <div style={{ margin: 'auto', justifyContent: 'center', textAlign: 'center', paddingTop: '5%' }} >

      {/* TODO: Loading instead of null */}
      {state.knowledgeBlocksData.length ? state.knowledgeBlocksData.map((block, i) => {
        return <>
          <KnowledgeBlock key={i} {...block} />
          <br />
          <br />
        </>
      }) : null}
    </div>
  );
}

export default App;
