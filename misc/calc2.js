w = 240;
h = 176;
c = 36;

let n = 0;

const res = main(w, h, c)
  .filter((_, i) => i % 4 === 0)
  .map((_) => _.i)
  .reduce((acc, curr, i, all) => {
    if (!n) n = all.length;
    const index = (i / 17) | 0;
    if (!acc[index]) acc[index] = [];
    acc[index].push(curr);
    return acc;
  }, [])
  .map((_) => `DATA ${_.join(',')}`)
  .join('\n');

console.log(res, n);

function main(w, h, corner) {
  let n = w * 2 + h * 2 - corner * 4;

  const res = [];

  for (let i = 0; i < n; i++) {
    let wl = (w + h) * 2 - corner * 4; // wavelength
    let hwl = wl / 2; // half wavelenth

    let x = Math.abs(((i + h / 2) % wl) - hwl); // triangle wave
    // you can comment out each of the following lines to see
    // how it affects the wave
    x = x - h / 2 + corner; // offset into the middle so we can clamp it
    x = clamp(x, 0, w); // clamp it between 0 and the width

    let y = Math.abs(((i - h / 1.5 + corner) % wl) - hwl); // triangle wave
    // you can comment out each of the following lines to see
    // how it affects the wave
    y = y - w / 2 + corner;
    y = clamp(y, 0, h) | 0;

    res.push({ x, y, i: (x << 8) + y });
  }

  return res;
}

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}
