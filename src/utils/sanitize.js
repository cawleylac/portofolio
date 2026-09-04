export const sanitize = (str = '') =>
  String(str).replace(/<[^>]*>/g, '').replace(/^[=+\-@\t\r|]/, "'$&").trim();