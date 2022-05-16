import MechanicRobot from '../../../public/svg/robot-mechanic.svg';
import styles from './MechanicRobotAnimation.module.scss';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export const MechanicRobotAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(wrapperRef);

  useEffect(() => {
    gsap
      .timeline({ repeat: -1, yoyo: true, repeatDelay: 5 })
      .to(
        q('.arm-tool-left'),
        {
          transformOrigin: 'center center',
          rotate: -100,
          y: 40,
          x: -5,
        },
        0
      )
      .to(
        q('.arm-tool-right'),
        {
          transformOrigin: 'center center',
          rotate: 100,
          y: 40,
          x: 5,
        },
        0
      )
      .to(
        q('.ear-right'),
        {
          transformOrigin: 'center center',
          rotate: -25,
        },
        0
      )
      .to(
        q('.ear-left'),
        {
          transformOrigin: 'center center',
          rotate: 25,
        },
        0
      );

    gsap
      .timeline({ repeat: -1 })
      .from(q('.screw1'), {
        y: -250,
        rotate: -720,
        transformOrigin: 'center',
        duration: 1,
      })
      .to(q('.screw1'), {
        y: 0,
        rotate: 0,
      })
      .to(q('.screw1'), {
        opacity: 0,
      })
      .from(
        q('.screw2'),
        {
          y: -250,
          rotate: 720,
          transformOrigin: 'center',
          duration: 1.5,
        },
        -1
      )
      .to(q('.screw2'), {
        y: 0,
        rotate: 0,
      })
      .to(q('.screw2'), {
        opacity: 0,
      });
  }, [q]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MechanicRobot />
    </div>
  );
};
