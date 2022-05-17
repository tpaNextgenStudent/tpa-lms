import PaperPlaneRobot from '../../../public/svg/robot-paper-plane.svg';
import styles from './PaperPlaneRobotAnimation.module.scss';
import { gsap, Linear } from 'gsap';
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(MotionPathPlugin);

export const PaperPlaneRobotAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(wrapperRef);

  useEffect(() => {
    const arm = q('.arm');
    const plane = q('.plane');

    const path = 'M 0 0 C 992 -482 -1133 -243 1028 100';
    gsap
      .timeline({ repeat: -1, repeatDelay: 2 })
      .from(arm, { rotate: -50, duration: 0.5 })
      .from(plane, { x: -20, y: -20, duration: 0.5, rotate: -30 }, 0)
      .to(
        plane,
        {
          x: 0,
          duration: 4,
          ease: Linear.easeOut,
          motionPath: {
            path: path,
            autoRotate: true,
          },
        },
        0.25
      )
      .to(plane, { opacity: 0, x: -20, y: -20, duration: 0, rotate: -30 })
      .to(arm, { rotate: -50, duration: 0.5 })
      .to(plane, { opacity: 1 });
    console.log({ arm, plane });
  }, [q]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <PaperPlaneRobot />
    </div>
  );
};
