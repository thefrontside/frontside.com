export function getAuthorImage(
  author: string,
  authorsWithImage: string[],
): string {
  const firstName = author.split(" ")[0].toLowerCase();
  const isAuthorImageAvailable = authorsWithImage.includes(firstName);
  return isAuthorImageAvailable
    ? `/assets/img/authors/${firstName}.jpg`
    : "/assets/fs-logo-no-text.svg";
}
