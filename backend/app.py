import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Включаем CORS для всех маршрутов

@app.route('/api/data')
def get_monitoring_data():
    """
    Читает данные из Excel-файла и возвращает их в формате JSON.
    """
    try:
        # Укажите имя вашего Excel-файла
        df = pd.read_excel('monitoring_data.xlsx')
        
        # Преобразуем DataFrame в JSON-формат.
        # .to_dict(orient='records') превратит каждую строку в словарь.
        data_json = df.to_dict(orient='records')
        
        # Возвращаем JSON-ответ
        return jsonify(data_json)

    except FileNotFoundError:
        return jsonify({"error": "Excel file not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Запускаем сервер на порту 5000, слушаем все интерфейсы (host='0.0.0.0')
    # Отключаем debug=True для продакшен-среды в контейнере
    app.run(host='0.0.0.0', port=5000)
