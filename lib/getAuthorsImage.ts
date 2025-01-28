import { authorsWithImage } from "./authorConfig.ts";

/**
 * Returns the author image URL or a fallback image URL if not available.
 */
export function getAuthorImage(author: string): string {
  const firstName = author.split(" ")[0].toLowerCase();
  return authorsWithImage.includes(firstName)
    ? `/assets/img/authorsAvatars/${firstName}.webp`
    : "/assets/fs-logo-no-text.svg";
}
