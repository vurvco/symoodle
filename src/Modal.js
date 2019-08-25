import React, { useEffect } from 'react'

import { ReactComponent as Check } from './icons/check.svg'
import { ReactComponent as Ex } from './icons/ex.svg'

import './Modal.css'

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