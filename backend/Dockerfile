# Используем официальный образ Python как базовый
FROM python:3.9-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файл зависимостей
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы проекта
COPY . .

# Открываем порт 5000
EXPOSE 5000

# Запускаем приложение
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]