export function isLogin(): boolean {
  const token = localStorage.getItem('token');
  return !!token && token.length > 0;
}
