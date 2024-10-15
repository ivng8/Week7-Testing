import { getCalculator, ICalculator } from './index';

describe('Calculator', (): void => {
  let calculator: ICalculator;

  beforeEach(async (): Promise<void> => {
    const Calculator: any = await getCalculator();
    calculator = new Calculator();
  });

  it('should display `1` when pressOne() is invoked', (): void => {

    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1');

  });

  it('should display `10+2` when `5*2+2` is invoked', (): void => {

    calculator.pressFive();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressTwo();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('10+2');

  });

  it('should display `6` when `5.+1=` is invoked', (): void => {

    calculator.pressFive();
    calculator.pressDot();
    calculator.pressPlus();
    calculator.pressOne();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('6');

  });

  it('should display `4/` when `8/2/` is invoked', (): void => {

    calculator.pressEight();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressDiv();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('4/');

  });

  it('should display `1` when `-3+4=` is invoked', (): void => {

    calculator.pressMinus();
    calculator.pressThree();
    calculator.pressPlus();
    calculator.pressFour();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('1');

  });

  it('should display `-2+` when `-4/2+` is invoked', (): void => {

    calculator.pressMinus();
    calculator.pressFour();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressPlus();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('-2+');

  });

  it('should display `40` when `10*2+40/2=` is invoked', (): void => {

    calculator.pressOne();
    calculator.pressZero();
    calculator.pressMult();
    calculator.pressTwo();
    calculator.pressPlus();
    calculator.pressFour();
    calculator.pressZero();
    calculator.pressDiv();
    calculator.pressTwo();
    calculator.pressEquals();
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('40');

  });

});
