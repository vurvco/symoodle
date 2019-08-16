import React from 'react'

import './IconButton.css'

export default function IconButton({ selected, inverted, handleClick, children }) {
  let buttonClass = 'icon-button'
  if (selected || inverted) {
    buttonClass = buttonClass + ' icon-button--active'
  }

  return (
    <button className={buttonClass} onClick={handleClick}>
      { children }
    </button>
  )
}