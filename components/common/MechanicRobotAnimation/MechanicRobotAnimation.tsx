import MechanicRobot from '../../../public/svg/robot-mechanic.svg';
import styles from './MechanicRobotAnimation.module.scss';
import { gsap, Linear } from 'gsap';
import { useEffect, useRef } from 'react';
import { randomFromRange } from '../../../utils/randomFromRange';

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

    const screws = Array(8)
      .fill(null)
      .map((_, i) => q(`.screw${i + 1}`));

    screws.forEach((screw, index) => {
      gsap.fromTo(
        screw,
        {
          y: 250,
          x: randomFromRange(-200, 30),
          rotate:
            [-1, 1][Math.round(Math.random())] * randomFromRange(180, 900),
          transformOrigin: 'center',
        },
        {
          y: -250,
          x: randomFromRange(-200, 30),
          rotate: 0,
          duration: randomFromRange(2, 4),
          repeat: -1,
          delay: randomFromRange(0, 5),
          ease: Linear.easeInOut,
        }
      );
    });
  }, [q]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MechanicRobot />
    </div>
  );
};
