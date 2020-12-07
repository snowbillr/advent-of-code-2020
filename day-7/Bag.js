export class Bag {
  constructor(color, containedBags = []) {
    this.color = color;
    this.containedBags = containedBags;
  }

  addContainedBag(bag) {
    this.containedBags.push(bag);
  }
}
