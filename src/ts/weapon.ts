// Паттерн Decorator для зачарованного оружия
export abstract class Оружие {
  abstract получитьУрон(): number; 
  abstract получитьОписание(): string;
  abstract получитьЭффекты(): string[];
  abstract получитьСтатусы(): string[];
  
}

export class Sword extends Оружие {
  получитьУрон(): number {
    return 15;
  }

  получитьОписание(): string {
    return "Стальной меч";
  }

  получитьЭффекты(): string[] {
    return [];
  }

  получитьСтатусы(): string[] {
    return [];
  }
}

export abstract class ЭффектыОружия extends Оружие {
  abstract получитьИмяЭффекта(): string;
  abstract поулчитьСтатус(): string 
 
  constructor(public weapon: Оружие) {
    super();
  } 
  
  получитьЭффекты(): string[] {
    return [...this.weapon.получитьЭффекты(), this.получитьИмяЭффекта()];
  }

  получитьСтатусы(): string[] {
    return [...this.weapon.получитьСтатусы(), this.поулчитьСтатус()].filter(s => s !== '');
  }

  получитьОписание(): string {
    return this.weapon.получитьОписание();
  }
}

// Конкретные эффекты
export class эффектЯда extends ЭффектыОружия {
  получитьУрон(): number {
    return this.weapon.получитьУрон() + 5;
  }

  получитьИмяЭффекта(): string {
    return "Яд (+5)";
  }

  поулчитьСтатус(): string {
    return 'Отравление (урон ядом)';
  }
}

export class эффектОгня extends ЭффектыОружия {
  получитьУрон(): number {
    return this.weapon.получитьУрон() + 10;
  }

  получитьИмяЭффекта(): string {
    return "Огонь (+10)";
  }

  поулчитьСтатус(): string {
    return ''; // огонь не даёт дополнительного статуса,
    //  но метод заявлен как обязательный
  }

}

export class эффектМолнии extends ЭффектыОружия {
  получитьУрон(): number {
    return this.weapon.получитьУрон() + 7;
  }

  получитьИмяЭффекта(): string {
    return "Молния (+7)";
  }

  поулчитьСтатус(): string {
    return 'Стан';
  }
}





