// https://stackoverflow.com/questions/60816022/conversion-for-hex-to-float-big-endian-abcd-in-js
export const convertHexToFloat = (cell: number) => {
  const sign = cell >> 31 ? -1 : 1;
  const exponent = (cell >> 23) & 0xff;

  return (
    ((sign * ((cell & 0x7fffff) | 0x800000) * 1.0) / Math.pow(2, 23)) *
    Math.pow(2, exponent - 127)
  );
};
