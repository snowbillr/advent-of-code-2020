export function parseInputStringToLines(input) {
  let lines = input.split("\n")

  if (lines[0].length === 0) {
    lines.splice(0, 1);
  }

  if (lines[lines.length - 1].length === 0) {
    lines.splice(lines.length - 1, 1);
  }

  return lines;
}
