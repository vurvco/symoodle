import React from 'react'

import { PageLayout, ContentSpace, ControlBar } from './PageLayout'
import IconButton from '../ui-elements/IconButton'

import { ReactComponent as Helm } from '../icons/helm.svg'
import { ReactComponent as Locked } from '../icons/locked.svg'
import { ReactComponent as Unlocked } from '../icons/unlocked.svg'

import './CluesPage.css'

/*
 * Page to display solved clues and the next unsolved clue
 */
export default function CluesPage({ goToSubmit, solved, availableClues }) {
  return (
    <PageLayout>
      <ControlBar className="bar bar--top">
        <div>
          {
            <IconButton handleClick={goToSubmit}>
              <Helm />
            </IconButton>
          }
        </div>
        <div>{ /* top-center of control bar */ }</div>
        <div>{ /* top-right of control bar */ }</div>
      </ControlBar>
      <ContentSpace>
        {
          availableClues.reverse().map((clue, i) => {
            // Loop over clues to determine which ones
            // are solved and which one isn't
            const clueSolved = solved.includes(clue.code)

            return (
              <div key={clue.code} className="clue-entry">
                <div className="clue-entry__title">
                  <span>
                    {
                      clueSolved ? <Unlocked /> : <Locked />
                    }
                  </span>
                  { clue.title }
                </div>
                <div className="clue-entry__clue">{ clue.clue }</div>
              </div>
            )
          })
        }
      </ContentSpace>
    </PageLayout>
  );
}
