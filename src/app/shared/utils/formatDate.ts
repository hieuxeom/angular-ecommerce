export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Define options for toLocaleDateString
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Use toLocaleDateString with the specified options
  return date.toLocaleDateString('en-US', options);
}

export function convertToInputFormat(dateString: string) {
  const date = new Date(dateString);

  const pad = (num: number, size: number) => {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  };

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1, 2);
  const day = pad(date.getDate(), 2);
  const hours = pad(date.getHours(), 2);
  const minutes = pad(date.getMinutes(), 2);
  const seconds = pad(date.getSeconds(), 2);
  const milliseconds = pad(date.getMilliseconds(), 3);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}
