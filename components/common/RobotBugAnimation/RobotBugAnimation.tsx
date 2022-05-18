import styles from './RobotBugAnimation.module.scss';
import RobotBug from '../../../public/svg/robot-bug.svg';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface RobotBugAnimationProps {}

export const RobotBugAnimation = ({}: RobotBugAnimationProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(wrapperRef);

  useEffect(() => {
    const bug = q('.bug');
    gsap.set(bug, { y: -100, rotate: 55, transformOrigin: 'center center' });
    // gsap.from(bug, { y: -100 });
  }, [q]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <RobotBug />
    </div>
  );
};
