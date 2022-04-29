import styles from './QuizAction.module.scss';

interface QuizActionProps {}

export const QuizAction = ({}: QuizActionProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>Start Quiz</button>
    </div>
  );
};
