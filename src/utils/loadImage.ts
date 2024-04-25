export function loadImage<T extends string>(url: T,success:(url:T)=>void,error?:(url:T)=>void) {
  const img = document.createElement('img');
  img.src = url;
  img.onload = () => success(url);
  img.onerror = () => error && error(url);
}
