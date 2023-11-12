import styles from './ErrorPage.module.scss';

function ErrorPage({ text, code }: { text: string; code: string }) {
  return (
    <div className={styles.error}>
      <div className={styles.block}>
        <h1>{text}</h1>
        <div className={styles.status}>{code}</div>
      </div>
    </div>
  );
}

export default ErrorPage;
