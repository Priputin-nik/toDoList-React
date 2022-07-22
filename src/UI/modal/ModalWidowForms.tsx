import React from 'react'
import styles from './ModalWidowForms.module.scss'

export const ModalWidowForms = ({children, visible, setVisible}: any) => {
  let styleArray = [styles.modal]
  if (!visible) {
    styleArray.push(styles.hidden)
  }
  return (
    <div className={styleArray.join(' ')} onClick={() => setVisible(false)}>
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
  )
}
