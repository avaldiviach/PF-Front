import React from 'react'

import styles from './ImagenPrincipal.module.css'
import image from '../../Assets/Images/2.svg'

function ImagenPrincipal() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.item__left}>
          <h1>Nike <span>Air</span></h1>
          <h2>Max</h2>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
          <button>Shop now</button>
        </div>
        <div className={styles.item__right}>
          <img src={image} alt="imagen" />
        </div>
      </div>
    </section>
  )
}

export default ImagenPrincipal;