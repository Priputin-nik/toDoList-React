import React, { SyntheticEvent, useState } from 'react';
import styles  from './button.module.scss'

const Button = function({children, ...props}: any) {
      
    return (
        <button {...props} className={styles.uiButton}>
            {children}
        </button>
    )
}

export default Button