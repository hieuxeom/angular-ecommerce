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
