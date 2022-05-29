export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const gameSpeed = (color, arr, speed) => {
  return sleep(speed).then(v => arr[color]);
};
