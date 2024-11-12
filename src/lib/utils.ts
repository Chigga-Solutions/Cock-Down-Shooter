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

export function areOverlapped(rect1: DOMRect, rect2: DOMRect): boolean {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

export const CLICK_RANGE = 50;

export function genSpeed(difficulty: string) {
    
  switch(difficulty) {
    case 'peacefull': {
      const min = 5000;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break;
    case 'easy': {
      const min = 4000;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break;
    case 'medium': {
      const min = 3000;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break;
    case 'hard': {
      const min = 2500;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break;
    case 'hardcore': {
      const min = 2000;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break; 
    default: {
      const min = 4000;
      return Math.random() > 0.75
        ? min + 250
        : Math.random() > 0.5
          ? min + 500
          : Math.random() > 0.25
            ? min + 750
            : min + 1000;
    }break;
  }
}

export function genInterval(difficulty: string) {
  switch(difficulty) {
    case 'peacefull': return 1500; break;
    case 'easy': return 1250; break;
    case 'medium': return 1000; break;
    case 'hard': return 550; break;
    case 'hardcore': return 350; break;
    default: return 1000; break;
  }
}
