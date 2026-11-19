// Модуль безпечного доступу до localStorage.
// Усі операції обгорнуто в try/catch: у приватному режимі або при вимкненому
// сховищі застосунок має працювати далі, а не ламатися.

// Читає значення за ключем і розбирає його як JSON. Повертає fallback при будь-якій помилці.
export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

// Записує значення як JSON. Повертає true/false залежно від успіху.
export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

// Видаляє значення за ключем.
export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    /* ігноруємо — сховище недоступне */
  }
}
