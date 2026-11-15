// Модуль доступу до даних: асинхронне завантаження каталогу з JSON-файлу.

// Завантажує список послуг. Перевіряє response.ok і кидає помилку у разі невдачі.
export async function fetchServices(url = "data/items.json") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не вдалося завантажити дані (HTTP ${response.status})`);
  }
  return response.json();
}
