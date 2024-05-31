export function loadImage<T extends string | undefined>(
  url: T,
  success: (url: string) => void,
  error?: (url: string) => void
) {
  if (!url) return;
  const img = document.createElement('img');
  img.src = url;
  img.onload = () => success(url);
  img.onerror = () => error && error(url);
}
