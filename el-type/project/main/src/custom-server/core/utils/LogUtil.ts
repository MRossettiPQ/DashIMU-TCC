import dayjs from 'dayjs';

const colours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

export type ColorKey = keyof typeof colours;

function getColor(colours: any, firstKey: string, secondKey?: string | null): string {
  let c: any = null;

  const optKey = firstKey as ColorKey;
  if (optKey) {
    c = colours[optKey];
  }

  switch (typeof c) {
    case 'string':
      return c;
    case 'object':
      if (secondKey) {
        return getColor(c, secondKey);
      }
      return '';
    case 'function':
      if (secondKey && c) {
        return c(secondKey);
      }
      return '';
    default:
      return '';
  }
}

function logColor(local = 'C_LOG', message = '', color = 'reset'): void {
  // TODO enquanto esse metodo apenas monta a mensagem para um console.log comum, futuramente irá servir como logger creator tambem
  const splitColor: string[] = color.split('.');
  //
  let c = '';
  if (splitColor.length > 1) {
    const firstName: string = splitColor[0];
    const secondName: string = splitColor[1];
    c = getColor(colours, firstName, secondName);
  } else {
    c = getColor(colours, color);
  }
  console.log(
    `${c}[CLOG] - ${dayjs().format('DD/MM/YYYY[-]HH:mm:ss')} - [${local}] - ${message}\x1b[0m`,
  );
}

export { logColor, colours, getColor };
