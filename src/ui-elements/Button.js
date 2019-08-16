import React from 'react'

import './Button.css'

export default function Button({ selected, inverted, handleClick, children }) {
  let buttonClass = 'button'
  if (selected || inverted) {
    buttonClass = buttonClass + ' button--active'
  }

  return (
    <button className={buttonClass} onClick={handleClick}>
      { children }
    </button>
  )
}