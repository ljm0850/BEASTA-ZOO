import * as React from 'react';
import SeasonAccordian from './SeasonAccordian'
import styles from './Collections.module.scss';

const Collections = () => {

  return (
    <div className={styles.CollBody}>
      <SeasonAccordian />
    </div>
  )
}

export default Collections;