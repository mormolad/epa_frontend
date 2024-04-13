import styles from './Logo.module.scss';

function Logo({ backColor = 'white', textColor }) {
  return (
    <div style={{ background: backColor }} className={styles.container}>
      <div className={styles.well_block}>
        <span>well</span>
      </div>
      <span style={{ color: textColor }}>done</span>
    </div>
  );
}

export default Logo;
