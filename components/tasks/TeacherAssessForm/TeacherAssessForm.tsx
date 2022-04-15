import styles from './TeacherAssessForm.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';

interface TeacherAssessFormProps {}

export const TeacherAssessForm = ({}: TeacherAssessFormProps) => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <textarea name="comment" id="comment" cols={30} rows={10} />
        <div className={styles.actionWrapper}>
          <div className={styles.scoreSelectWrapper}></div>
          <CTAButton text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};
