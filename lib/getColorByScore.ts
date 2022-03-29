const SCORE_COLOR_MODIFIER = {
  RED: 'Red',
  ORANGE: 'Orange',
  GREEN: 'Green',
};

export function getColorByScore(score: number) {
  switch (score) {
    case 1:
      return SCORE_COLOR_MODIFIER.RED;
    case 2:
      return SCORE_COLOR_MODIFIER.ORANGE;
    case 3:
      return SCORE_COLOR_MODIFIER.GREEN;
    default:
      return SCORE_COLOR_MODIFIER.GREEN;
  }
}
