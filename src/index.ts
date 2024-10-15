
import { readdirSync } from 'fs';
import { resolve } from 'path';

const validFilePaths: Array<string> = readdirSync(resolve(__dirname, 'libs'), 'utf8')
  .map((s: string): string => s.replace('.js', ''));


let calcVariant: string = 'control';
if (process.argv.indexOf('-calcVariant') > -1) {
  calcVariant = process.argv[process.argv.indexOf('-calcVariant') + 1];
}

export interface ICalculator {
  pressOne(): void;
  pressTwo(): void;
  pressThree(): void;
  pressFour(): void;
  pressFive(): void;
  pressSix(): void;
  pressSeven(): void;
  pressEight(): void;
  pressNine(): void;
  pressZero(): void;

  pressPlus(): void;
  pressMinus(): void;
  pressMult(): void;
  pressDiv(): void;

  pressDot(): void;
  pressClear(): void;
  pressEquals(): void;

  display(): string;
}

export async function getCalculator(): Promise<any> {
  const filePath: string = `./libs/${validFilePaths.includes(calcVariant) ? calcVariant : 'control'}`;
  return (await import(filePath)).default;
}
