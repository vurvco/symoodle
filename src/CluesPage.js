import React from 'react'

import { PageLayout, ContentSpace, ControlBar } from './PageLayout'
import IconButton from './ui-elements/IconButton'

import { ReactComponent as Helm } from './icons/helm.svg'
import { ReactComponent as Locked } from './icons/locked.svg'
import { ReactComponent as Unlocked } from './icons/unlocked.svg'

import './CluesPage.css'

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
        <div>{ /* top-center */ }</div>
        <div>{ /* top-right */ }</div>
      </ControlBar>
      <ContentSpace>
        {
          availableClues.reverse().map((clue, i) => {
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
