export class Rule {
  constructor(bagColor, conditions) {
    this.bagColor = bagColor;
    this.conditions = conditions;
  }

  appliesTo(bag) {
    return bag.color === this.bagColor;
  }

  areContentsValid(bag) {
    const containedBagColorCounts = Object.keys(this.conditions).reduce((hash, color) => {
      hash[color] = 0;
      return hash;
    }, {});

    let foundUnlistedColor = false;
    bag.containedBags.forEach(containedBag => {
      if (containedBagColorCounts[containedBag.color] == null) {
        foundUnlistedColor = true;
        return;
      }

      containedBagColorCounts[containedBag.color] += 1;
    });

    let isMissingColors = Object.values(containedBagColorCounts).reduce((missing, count) => missing || count === 0, false);

    const expectedColorCountsFound = Object.entries(this.conditions).reduce(
      (expected, [color, count]) => {
        return expected && count === this.conditions[color];
      },
      true
    );

    return !isMissingColors && !foundUnlistedColor && expectedColorCountsFound;
  }
}
