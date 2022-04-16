import styles from './TeacherAssessForm.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import {
  CustomSelect,
  OptionType,
} from '../../common/CustomSelect/CustomSelect';
import { SingleValue } from 'react-select';
import { FormEvent, useState } from 'react';
import CrossIcon from '../../../public/svg/cross-icon.svg';
import { useRouter } from 'next/router';
import { postTeacherAssessment } from '../../../api/assess';

interface TeacherAssessFormProps {
  closePanel: () => void;
}

const scoreOptions = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2 ',
  },
  {
    value: '3',
    label: '3',
  },
];

export const TeacherAssessForm = ({ closePanel }: TeacherAssessFormProps) => {
  const router = useRouter();
  const attemptId = router.query.assignment as string;

  const [currentScore, setCurrentScore] = useState<OptionType>(scoreOptions[0]);
  const [comment, setComment] = useState('');

  const handleScoreChange = (option: SingleValue<OptionType>) => {
    if (option?.value) {
      setCurrentScore({ value: option.value, label: option.label });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postTeacherAssessment(attemptId, {
        body: { score: currentScore.value, comment },
      });
      router.push(`${router.asPath}?view=comments`);
      //refresh the page to get fresh data
      // router.reload();
    } catch (err) {
      //show toast error message
      console.error(err);
    }
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
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
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          name="comment"
          id="comment"
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
            <CustomSelect
              id="score-select"
              className={styles.select}
              options={scoreOptions}
              value={currentScore}
              handleChange={handleScoreChange}
            />
          </div>
          <CTAButton className={styles.submit} text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};
