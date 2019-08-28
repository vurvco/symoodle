import React, { useState } from 'react'

import SubmitPage from './pages/SubmitPage'
import CluesPage from './pages/CluesPage'
import Modal from './ui-elements/Modal'

import clues from './clues'

const pageOptions = {
  clues: 'CLUES_PAGE',
  submit: 'SUBMIT_PAGE',
}

/*
 * Top level component
 * handles routing, modals, and clues
 */ 
export default function App() {
  // Routing
  const [page, setPage] = useState(pageOptions.clues)
  
  // Modal state
  const [successModal, setSuccessModal] = useState(false)
  const [failureModal, setFailureModal] = useState(false)
  
  // Clue state, available clues = solved clues + 1 unsolved clue
  const [solved, setSolved] = useState([])
  const availableClues = clues.slice(0, solved.length + 1)

  function checkClue(submission) {
    const unsolved = availableClues[availableClues.length - 1].code
    if (unsolved === submission) {
      setSolved([...solved, submission])
      setPage(pageOptions.clues)
      setSuccessModal(true)
    } else {
      setFailureModal(true)
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

      {
        successModal && <Modal correct={true} onTimeout={() => setSuccessModal(false)} />
      }

      {
        failureModal && <Modal correct={false} onTimeout={() => setFailureModal(false)} />
      }
    </div>
  );
}

export { pageOptions }