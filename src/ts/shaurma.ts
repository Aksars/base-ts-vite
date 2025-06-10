// Паттерн Builder для самой лучшей шаурмы

export class Шаурма {
  private основа: string = '';
  private мясо: string = '';
  private соус: string = '';
  private овощи: string[] = [];
  private допы: string[] = [];

  // Методы построения
  добавьМясо(мясо: string): this {
    this.мясо = мясо;
    return this;
  }

  добавьСоус(соус: string): this {
    this.соус = соус;
    return this;
  }

  добавьОвощи(...овощи: string[]): this {
    this.овощи.push(...овощи);
    return this;
  }

  добавьДопы(...допы: string[]): this {
    this.допы.push(...допы);
    return this;
  }

  // Финальный метод сборки
  build(): Шаурма {
    if (!this.мясо || !this.соус) {
      throw new Error("Мясо и соус обязательны для шаурмы!");
    }
    
    // Создаем новый экземпляр с текущими параметрами
    const шаурма = new Шаурма();
    шаурма.основа = "лаваш"
    шаурма.мясо = this.мясо;
    шаурма.соус = this.соус;
    шаурма.овощи = [...this.овощи];
    шаурма.допы = [...this.допы];
    
    return шаурма;
  }

  // Метод для описания
  описать(): string {
    return `Шаурма (${this.основа}) мясо: ${this.мясо}, соус: ${this.соус}, овощи: ${this.овощи.join(', ')}` +
      (this.допы.length ? `, допы: ${this.допы.join(', ')}` : '');
  }
}