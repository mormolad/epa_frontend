# "Well Done" - Сервис по оценке эффективности работы сотрудников  

### Описание проекта  

Наш сервис позволяет оценить эффективность работы сотрудников по двум направлениям:  
1. По накопленным баллам за выполненные задачи  
Руководитель создает текущие задачи и присваивает им определенное количество баллов в зависимости от сложности. По итогам месяца может наглядно увидеть суммарное количество баллов и оптимально распределить премии.  
2. По оценкам в анкетах  
Руководитель создает анкеты в которых прописывает критерии для оценки сотрудников и проводит анкетирование.  Каждый сотрудник и руководитель оценивают работу своих коллег по анкетам.  
В результате анкетирования у каждого сотрудника отображается средняя оценка по всем анкетам и критериям.  

### Стек технологий:  

- React  
- HTML5  
- SCSS  
- Redux Toolkit  

### Функционал:  

Админ:  

- Страница Регистрации  
Для саморегистрации руководителя в качестве админа. 

- Страница Авторизации  
Для входа админа в приложение.  

- Страница Личного кабинета админа  
В шапке показывает данные админа.  
Предоставляет возможность редактировать своих данных и редактировать критерии для анкет.  

- Страница Моя команда  
Добавление сотрудников в свою команду.  
Создание логинов и паролей для входа сотрудников.  
Просмотр всех добавленных сотрудников.  
Возможность редактировать данные сотрудников.  
Перейти в личный кабинет каждого сотрудника чтобы просмотреть его задачи и оценки.  

- Страница Канбан доска  
Добавление, редактирование проектов.  
Создание, просмотр, перемещение по доске, фильтрация и редактирование задач.  
Просмотр подробной информации по задачам.  

- Страница Оценка ЭС (эффективности сотрудников)  
Функция "Провести анкетирование".  
Фильтрация карточек с анкетами сотрудников по оцененным и не оцененным.  
Переход в анкету сотрудника и оценки по 5 бальной шкале в виде звездочек.  
Добавление рекомендаций.  
Просмотр оцененных карточек.  

- Страница Аналитика (в разработке)  
Просмотр оценок и дедлайнов.  
Возможность увидеть командную оценку и индивидуальную по каждому сотруднику за разные периоды.  

Сотрудник:  

- Страница Авторизации  
Для входа сотрудника в приложение.  

- Страница Личного кабинета сотрудника  
В шапке показывает данные пользователя, его рейтинг и количество баллов.  
Есть возможность просмотра списков задач и списков оценок.  
Отображает назначенные задачи и возможность фильтровать эти задачи по статусу.  
Можно перейти в каждую задачу и посмотреть подробности по ней.  
Отображает списки оценок да периоды и средний балл.  
Можно перейти в каждую оценку и увидеть детальное описание по каким критериям какие оценки были поставлены.  

- Страница Канбан доска  
Просмотр, перемещение по доске и фильтрация задач.  
Просмотр подробной информации по задачам.  

- Страница Оцени коллегу  
Фильтрация карточек с анкетами коллег по оцененным и не оцененным.  
Переход в анкету коллеги и оценки по 5 бальной шкале в виде звездочек.  
Просмотр оцененных карточек.  

- Страница Аналитика (в разработке)  
Просмотр оценок и дедлайнов.  
Возможность увидеть командную оценку и свою индивидуальную за разные периоды.  

## Установка и запуск проекта:  

Клонировать репозиторий:  

    git clone  

Установить зависимости:  

    npm install  

Инициализировать husky (это пре коммиты):  

    npx husky init  

Собрать проект:  

    npm run build  

Запустить проект:  

    npm run start  

Запустить eslint:  

    npm run lint  

Запустить eslint и пофиксить то чот фозможно автоматом:  

    npm run lint:fix  

Запустить форматирование prettier:  

    npm run format  

### Создано в соавторстве  

- Гармаева Ирина https://github.com/IrinaGarmaeva  
- Мохов Александр https://github.com/Alexandr-Mokhov  
- Перевалов Антон https://github.com/mormolad  
- Русинов Дмитрий https://github.com/Dmitry-Rusinov  
- Колотилина Дарья https://github.com/kolotilina-d  
- Ратникова Ольга https://github.com/methoni  
- Pavel Prokofev https://github.com/Pavel-Prokofev  
- Alice Ramires https://github.com/alice-rami  
