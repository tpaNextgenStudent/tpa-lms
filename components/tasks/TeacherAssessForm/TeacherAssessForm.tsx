import styles from './TeacherAssessForm.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { ChangeEvent, FormEvent, useState } from 'react';
import CrossIcon from '../../../public/svg/cross-icon.svg';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { postTeacherAssessment } from '../../../apiHelpers/assess';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import clsx from 'clsx';

interface TeacherAssessFormProps {
  closePanel: () => void;
  openSelectToTop?: boolean;
}

const scoreOptions = ['3', '2', '1'];

export const TeacherAssessForm = ({ closePanel }: TeacherAssessFormProps) => {
  const router = useRouter();
  const attemptId = router.query.assignment as string;

  const [currentScore, setCurrentScore] = useState(scoreOptions[0]);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postTeacherAssessment(attemptId, {
        body: { score: currentScore, comment },
      });
      closePanel();
      await router.push('/teacher/assignments');
      toast('Attempt successfully assessed!', { type: 'success' });
    } catch (err) {
      toast('There was an error while assessing this attempt!', {
        type: 'error',
      });
    }
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentScore(value);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={closePanel}
        className={styles.closeButton}
        aria-label="Close teacher assess panel."
      >
        <CrossIcon />
      </button>
      <form data-cypress="TeacherAssessForm" onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          name="comment"
          id="comment"
          data-cypress="TeacherAssessFormComment"
          rows={6}
          placeholder="Add your comment here..."
          value={comment}
          onInput={handleInput}
        />
        <div className={styles.actionWrapper}>
          <div className={styles.selectWrapper}>
            <label className={styles.selectLabel} htmlFor="score-select">
              Select score
            </label>
            <div
              data-cypress="TeacherAssessFormScore"
              className={styles.radioWrapper}
            >
              {scoreOptions.map(v => {
                const id = `score${v}`;
                return (
                  <label key={id} htmlFor={id}>
                    <TaskScoreBadge
                      className={clsx(
                        styles.scoresBadge,
                        v === currentScore && styles.scoresBadgeActive
                      )}
                      score={Number(v)}
                      withBorder
                    />
                    <input
                      className={styles.radioInput}
                      onChange={handleRadioChange}
                      type="radio"
                      name="score"
                      id={id}
                      value={v}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <CTAButton className={styles.submit} text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};
