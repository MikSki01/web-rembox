// Модуль допоміжних функцій.

// debounce — відкладає виклик fn, доки не мине delay мс без нових викликів.
// Застосовується до пошуку, щоб не фільтрувати на кожне натискання клавіші.
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
