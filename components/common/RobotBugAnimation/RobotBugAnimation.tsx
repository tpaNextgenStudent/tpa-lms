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
    const bugLine = q('.bug-line');
    const armLeft = q('.arm-tool-left');
    const armRight = q('.arm-right');
    const earLeft = q('.ear-left');
    const earRight = q('.ear-right');
    gsap.set(bug, { y: -100, rotate: -37, transformOrigin: 'center center' });
    gsap.set(bugLine, { opacity: 0 });
    gsap.set(earLeft, {
      rotate: 90,
      x: -1.7,
      y: 1,
      transformOrigin: 'center right',
    });
    gsap.set(earRight, {
      rotate: -90,
      x: 1.8,
      y: 1,
      transformOrigin: 'center left',
    });

    gsap
      .timeline({ repeat: -1, yoyo: true, repeatDelay: 4 })
      .to(bug, { y: 0, rotate: 0, duration: 0.5 })
      .to(bugLine, { opacity: 1, duration: 0.5 })
      .to(earLeft, { rotate: 0, x: 0, y: 0, duration: 0.25 })
      .to(earRight, { rotate: 0, x: 0, y: 0, duration: 0.25 }, 1)
      .to(
        armLeft,
        { rotate: 90, y: -30, transformOrigin: 'center center' },
        1.25
      )
      .to(
        armRight,
        {
          rotate: -120,
          y: -15,
          transformOrigin: 'center center',
        },
        1.25
      );
  }, [q]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <RobotBug />
    </div>
  );
};
