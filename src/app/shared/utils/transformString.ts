export function transformString(input: string): string {
  const length = input.length;

  if (length <= 8) {
    return input;
  }

  const start = input.substring(0, 4);
  const end = input.substring(length - 4);

  return `${start}...${end}`;
}
