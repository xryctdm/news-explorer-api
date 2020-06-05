# news-explorer-api

Сервер для проекта News Explorer

* https://api.xryctdm-news-explorer.tk


* http://84.201.172.63


## Установка

Скопируйте проект к себе на компьютер:
```
git clone https://github.com/xryctdm/news-explorer-api.git
```
Установите зависимости:
```
npm install
```

## Работа

Запустите сервер командой:
```
npm run start
```
Запустите сервер с hot reload:
```
npm run dev
```

Для работы с сервером используйте следующие команды:

| ЗАПРОС                                             | ОТВЕТ              |
| ---------------------------------------------------| ------------------ |
| POST /signup                                             | создаёт пользователя с переданными в теле email, password и name    |
| POST /signin                                             | проверяет переданные в теле почту и пароль и возвращает JWT    |
| GET /users/me                                            | возвращает информацию о пользователе (email и имя)    |
| GET /articles                                            | возвращает все сохранённые пользователем статьи    |
| POST /articles                             | создаёт статью с переданными в теле keyword, title, text, date, source, link и image |
| DELETE /articles/articleId                          | удаляет сохранённую статью  по _id |
| Несуществующий адрес                               | { "message": "Запрашиваемый ресурс не найден" }  |
