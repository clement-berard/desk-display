export function getStaticFileUrl(path: string) {
  return `${import.meta.env.VITE_LOCAL_API_STATIC_SERVER}/files/${path}`;
}
