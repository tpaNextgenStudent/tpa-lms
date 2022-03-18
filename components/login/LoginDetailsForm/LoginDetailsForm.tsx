import styles from './LoginDetailsForm.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { CTAButton } from '../../common/CTAButton/CTAButton';

interface LoginDetailsFormProps {}

const initialFormState = {
  firstName: '',
  lastName: '',
  bio: '',
};

export const LoginDetailsForm = ({}: LoginDetailsFormProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //todo: send post request to endpoint
    console.log(formState);

    //todo: redirect to /student or /teacher based on role
    // router.push('/teacher');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldWrapper}>
        <label className={styles.label} htmlFor="firstName">
          Name
        </label>
        <input
          onChange={handleChange}
          className={styles.field}
          required
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Type here..."
        />
      </div>
      <div className={styles.fieldWrapper}>
        <label className={styles.label} htmlFor="lastName">
          Surname
        </label>
        <input
          onChange={handleChange}
          className={styles.field}
          required
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Type here..."
        />
      </div>
      <div className={styles.fieldWrapper}>
        <label className={styles.label} htmlFor="bio">
          Tell us something about your hobbies
        </label>
        <textarea
          onChange={handleChange}
          className={styles.field}
          required
          name="bio"
          id="bio"
          cols={30}
          rows={3}
          placeholder="Type here..."
        />
      </div>
      <CTAButton type="submit" text="Submit" />
    </form>
  );
};
