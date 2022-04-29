import { zeroPad } from './zeroPad';

export const formatTimeString = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time - min * 60);
  const ms = Math.floor((time - (min * 60 + sec)) * 100);

  return `${zeroPad(min, 2)}:${zeroPad(sec, 2)}:${zeroPad(ms, 2)}`;
};
