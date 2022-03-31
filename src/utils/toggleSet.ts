export class DateSet {
  private elements: Date[];

  constructor(initialElements?: Date[]) {
    if (initialElements) {
      this.elements = [...initialElements];
    } else {
      this.elements = [];
    }
  }

  isDateEqual(first: Date, second: Date) {
    return first.toDateString() === second.toDateString();
  }

  add(date: Date) {
    if (this.has(date)) return;
    this.elements.push(date);
  }

  delete(date: Date) {
    const prevElements = this.elements;
    this.elements = prevElements.filter((e) => !this.isDateEqual(e, date));
  }

  has(date: Date) {
    return this.elements.some((e) => this.isDateEqual(e, date));
  }

  toggle(date: Date) {
    if (this.has(date)) {
      this.delete(date);
    } else {
      this.add(date);
    }
  }

  values() {
    return [...this.elements];
  }
}
