import styles from './ImageAction.module.scss';

export const ImageAction = () => {
  return (
    <div className={styles.imageActionWrapper}>
      <form>
        <div className={styles.uploadImageArea}>
          <input type="file" name="image" id="image" />
        </div>
        <div className={styles.submitWrapper}>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
