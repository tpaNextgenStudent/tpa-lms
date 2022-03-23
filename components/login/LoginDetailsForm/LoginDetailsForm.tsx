import styles from './LoginDetailsForm.module.scss';
import { useRouter } from 'next/router';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import axios from 'axios';
import { apiPath } from '../../../lib/utils/apiPath';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userDetailsSchema, UserDetails } from '../../../schemas/userDetails';
import clsx from 'clsx';
import { InputErrorMessage } from '../InputErrorMessage/InputErrorMessage';

interface LoginDetailsFormProps {}

export const LoginDetailsForm = ({}: LoginDetailsFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<UserDetails>({ resolver: yupResolver(userDetailsSchema) });

  const onSubmit = handleSubmit(async data => {
    try {
      await axios.post(apiPath('user/details'), data);
      await router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
        />
        {errors.name?.message && (
          <InputErrorMessage message={errors.name.message} />
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <label className={clsx(styles.label)} htmlFor="surname">
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
        />
        {errors.surname?.message && (
          <InputErrorMessage message={errors.surname.message} />
        )}
      </div>
      <div className={styles.fieldWrapper}>
        <label className={clsx(styles.label)} htmlFor="bio">
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
        />
        {errors.bio?.message && (
          <InputErrorMessage message={errors.bio.message} />
        )}
      </div>
      <div className={styles.ctaButtonWrapper}>
        <CTAButton type="submit" text="Submit" />
      </div>
    </form>
  );
};
