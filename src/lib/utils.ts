export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function decideBetween<T>(a: T, b: T): T {
  return Math.random() > 0.5 ? a : b;
}

export function decideBetweenDir<T>(a: T, b: T, c: T, d: T): T {
  return Math.random() > 0.75
    ? a
    : Math.random() > 0.5
      ? b
      : Math.random() > 0.25
        ? c
        : d;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Coord = [x: number, y: number]; // x, y (%)

export function generateChickenCoords(): [Coord, Coord, Direction, Direction] {
  const startSide: Direction = decideBetweenDir('up', 'down', 'left', 'right');
  let endSide: Direction = decideBetweenDir('up', 'down', 'left', 'right');
  while (startSide === endSide) {
    endSide = decideBetweenDir('up', 'down', 'left', 'right');
  }
  let coordXs, coordYs, coordXe, coordYe;
  switch (startSide) {
    case 'up':
      {
        coordYs = 100;
        coordXs = randomBetween(30, 70);
      }
      break;
    case 'down':
      {
        coordYs = 0;
        coordXs = randomBetween(30, 70);
      }
      break;
    case 'left':
      {
        coordYs = randomBetween(30, 70);
        coordXs = 0;
      }
      break;
    case 'right':
      {
        coordYs = randomBetween(30, 70);
        coordXs = 100;
      }
      break;
  }

  switch (endSide) {
    case 'up':
      {
        coordYe = 100;
        if (startSide === 'right') coordXe = randomBetween(0, 100 - coordYs);
        else if (startSide === 'left') coordXe = randomBetween(coordYs, 100);
        else coordXe = randomBetween(0, 100);
      }
      break;
    case 'down':
      {
        coordYe = 0;
        if (startSide === 'right') coordXe = randomBetween(0, coordYs);
        else if (startSide === 'left') coordXe = randomBetween(coordYs, 100);
        else coordXe = randomBetween(0, 100);
      }
      break;
    case 'left':
      {
        coordXe = 0;
        if (startSide === 'up') coordYe = randomBetween(0, 100 - coordXs);
        else if (startSide === 'down') coordYe = randomBetween(50, 100);
        else coordYe = randomBetween(0, 100);
      }
      break;
    case 'right':
      {
        coordXe = 100;
        if (startSide === 'up') coordYe = randomBetween(0, 100 - coordXs);
        else if (startSide === 'down') coordYe = randomBetween(coordXs, 100);
        else coordYe = randomBetween(0, 100);
      }
      break;
  }

  
  /*console.log("start:" + startSide);
  console.log("end:" + endSide);
  console.log("x1:" + coordXs);
  console.log("y1:" + coordYs);
  console.log("x2:" + coordXe);
  console.log("y2:" + coordYe);*/
  return [[coordXs, coordYs], [coordXe, coordYe], startSide, endSide];
}
