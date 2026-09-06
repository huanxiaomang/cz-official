

export function getAppEnvConfig() {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_API_URL,
    VITE_GLOB_DOCS_URL,
  } = import.meta.env;

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_DOCS_URL,
  };
}

function trimTrailingSlash(value = '') {
  return value.replace(/\/+$/, '');
}

function trimLeadingSlash(value = '') {
  return value.replace(/^\/+/, '');
}

function joinUrl(base: string, path = '') {
  const normalizedBase = trimTrailingSlash(base);
  const normalizedPath = trimLeadingSlash(path);

  if (!normalizedPath)
    return normalizedBase;

  return `${normalizedBase}/${normalizedPath}`;
}

function getRuntimeOrigin() {
  if (typeof window === 'undefined')
    return '';

  return window.location.origin;
}

export function resolveApiUrl(path = '') {
  const { VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig();
  const base = trimTrailingSlash(VITE_GLOB_API_URL || getRuntimeOrigin());
  const prefix = trimLeadingSlash(VITE_GLOB_API_URL_PREFIX || '/api');

  return joinUrl(joinUrl(base, prefix), path);
}

export function resolveUploadUrl(path = '') {
  const { VITE_GLOB_UPLOAD_URL } = getAppEnvConfig();
  const fallbackBase = joinUrl(getRuntimeOrigin(), 'uploads');
  const base = trimTrailingSlash(VITE_GLOB_UPLOAD_URL || fallbackBase);

  return joinUrl(base, path);
}

export const CZ_GITHUB_URL = 'https://github.com/huanxiaomang/cz-official';
