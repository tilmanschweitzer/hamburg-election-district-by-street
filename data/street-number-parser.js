export function streetNumber(value) {
  if (/^\d+$/.test(value)) {
    return { v: parseInt(value)};
  }
  if (/^\d+[a-z]$/.test(value)) {
    return {
      v: parseInt(value),
      s: /^\d+([a-z])$/.exec(value)['0']
    };
  }
  throw new Error("Unexpected value " + value)
}
