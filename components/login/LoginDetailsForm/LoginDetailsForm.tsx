import styles from './LoginDetailsForm.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  userDetailsSchema,
  UserDetails,
} from '../../../schemas/userDetailsSchema';
import clsx from 'clsx';
import { capitalize } from '../../../utils/capitalize';

interface LoginDetailsFormProps {
  onSubmit: (data: UserDetails) => Promise<void>;
}

export const LoginDetailsForm = ({ onSubmit }: LoginDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<UserDetails>({ resolver: yupResolver(userDetailsSchema) });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
    >
      <div className={styles.fieldWrapper}>
        <label className={clsx(styles.label)} htmlFor="name">
          Name
        </label>
        <input
          {...register('name')}
          className={clsx(
            styles.field,
            errors.name && styles.fieldError,
            !errors.name && isSubmitted && styles.fieldCorrect
          )}
          placeholder="Type here..."
          data-testid="name-input"
        />
        {errors.name?.message && (
          <p className={styles.errorMessage} data-testid="name-error">
            {capitalize(errors.name.message)}
          </p>
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <label
          className={clsx(
            styles.label,
            errors.surname && styles.labelError,
            !errors.surname && isSubmitted && styles.labelCorrect
          )}
          htmlFor="surname"
        >
          Surname
        </label>
        <input
          {...register('surname')}
          className={clsx(
            styles.field,
            errors.surname && styles.fieldError,
            !errors.surname && isSubmitted && styles.fieldCorrect
          )}
          placeholder="Type here..."
          data-testid="surname-input"
        />
        {errors.surname?.message && (
          <p className={styles.errorMessage} data-testid="surname-error">
            {capitalize(errors.surname.message)}
          </p>
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <label
          className={clsx(
            styles.label,
            errors.bio && styles.labelError,
            !errors.bio && isSubmitted && styles.labelCorrect
          )}
          htmlFor="bio"
        >
          Tell us something about your hobbies
        </label>
        <textarea
          {...register('bio')}
          className={clsx(
            styles.field,
            errors.bio && styles.fieldError,
            !errors.bio && isSubmitted && styles.fieldCorrect
          )}
          cols={30}
          rows={3}
          placeholder="Type here..."
          data-testid="bio-input"
        />
        {errors.bio?.message && (
          <p className={styles.errorMessage} data-testid="bio-error">
            {capitalize(errors.bio.message)}
          </p>
        )}
      </div>
      <div className={styles.ctaButtonWrapper}>
        <CTAButton type="submit" text="Submit" />
      </div>
    </form>
  );
};
