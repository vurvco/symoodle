import React from 'react'

import './PageLayout.css'

/*
 * Just some CSS wrappers to create
 * a unified page layout
 */
function PageLayout({ children }) {
  return (
    <div className="page-layout">
      { children }
    </div>
  )
}

function ContentSpace({ children }) {
  return (
    <div className="content-space">
      { children }
    </div>
  )
}

function ControlBar({ children }) {
  return (
    <div className="control-bar">
      { children }
    </div>
  )
}

export {
  PageLayout,
  ContentSpace,
  ControlBar,
}