import React, { useEffect } from 'react'

import { ReactComponent as Check } from '../icons/check.svg'
import { ReactComponent as Ex } from '../icons/ex.svg'

import './Modal.css'

/*
 * Modal to display success/failure on code submission
 * Doesn't maintain it's own show state, just calls
 * onTimeout callback after 800ms
 */
export default function Modal({ correct, onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(onTimeout, 800)
    return () => clearTimeout(timer)
  }, [onTimeout])

  return (
    <div className="modal__container">
        <div className="modal__inner">
          {
            correct ? (
              <Check />
            ) : (
              <Ex />
            )
          }
        </div>
      </div>
  )
}