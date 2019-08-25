import React, { useState } from 'react'

import SubmitPage from './SubmitPage'
import CluesPage from './CluesPage'
import clues from './clues'

import './App.css'

const pageOptions = {
  clues: 'CLUES_PAGE',
  submit: 'SUBMIT_PAGE',
}

export default function App() {
  const [page, setPage] = useState(pageOptions.submit)
  const [solved, setSolved] = useState([])

  const availableClues = clues.slice(0, solved.length + 1)

  function checkClue(clue) {
    const unsolved = availableClues[availableClues.length - 1].code
    if (unsolved === clue) {
      setSolved([...solved, clue])
      setPage(pageOptions.clues)
    }
  }

  return (
    <div className="app-container">
      { 
        page === pageOptions.submit && (
          <SubmitPage goToClues={() => setPage(pageOptions.clues)}
            handleClueSubmit={checkClue} />
        )
      }

      { 
        page === pageOptions.clues && (
          <CluesPage goToSubmit={() => setPage(pageOptions.submit)}
            solved={solved}
            availableClues={availableClues} />
        )
      }
    </div>
  );
}

export { pageOptions }