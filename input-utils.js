export function parseInputStringToLines(input) {
  return input.split("\n")
              .filter(line => line.length)
}
