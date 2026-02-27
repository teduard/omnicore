export const logger = {
  debug: import.meta.env.DEV ? console.debug.bind(console) : () => {},
  info:  import.meta.env.DEV ? console.info.bind(console)  : () => {},
  warn:  console.warn.bind(console),
  error: console.error.bind(console),
};