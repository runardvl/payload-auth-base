# Payload CMS Template with Auth & Email

Готовый шаблон Payload CMS с предустановленной аутентификацией, ролевой моделью и email рассылкой.

## ✨ Предустановленные функции

- **🔐 Аутентификация** - Готовая система регистрации и входа
- **👥 Ролевая модель** - Администраторы и пользователи с разными правами
- **📧 Email система** - Настроенная отправка писем через Nodemailer
- **💾 База данных** - Поддержка PostgreSQL и SQLite
- **🐳 Docker** - Готовая контейнеризация для разработки

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- PostgreSQL (опционально, можно использовать SQLite)
- PNPM (рекомендуется) или NPM

### Установка

**Настройка переменных окружения (.env)**

## База данных (PostgreSQL или SQLite)

```env
DATABASE_URL=postgresql://admin:password@localhost:5432/payload_auth_base

# или для SQLite:

DATABASE_URI=file:./payload.db

# SMTP для email (mail.ru пример)

SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_USER=your-email@mail.ru
SMTP_PASS=your-app-password

# Секретный ключ

PAYLOAD_SECRET=your-random-secret-key3.
```

**Установка зависимостей**

```bash
pnpm install
```

**Запуск разработки**

```bash
pnpm dev
```

Админка будет доступна по: http://localhost:3000/admin

## 🏗️ Структура проекта

### Коллекции

- **Users** - Пользователи с ролями (admin/user)
- **Posts** - Статьи блога с поддержкой кода
- **Categories** - Категории статей
- **Tags** - Теги статей
- **Pages** - Статические страницы
- **Media** - Медиафайлы

### Особенности

- ✅ Подсветка синтаксиса в статьях
- ✅ Ролевая модель доступа
- ✅ Email уведомления
- ✅ PostgreSQL/SQLite поддержка
- ✅ Docker контейнеризация

## 📧 Настройка Email

Проект использует Nodemailer для отправки email. Для тестирования:

1. Настройте SMTP в `.env`
2. Откройте http://localhost:3000/email-check для тестовой отправки

## 🐳 Docker поддержка

# Запуск PostgreSQL

`docker-compose up -d postgres`

# Остановка

`docker-compose down`

## 🔐 Ролевая модель

- **Администраторы** - Полный доступ ко всем функциям
- **Пользователи** - Могут видеть/редактировать только свой профиль

## 🎨 Разработка

Проект использует:

- Payload CMS 3.x
- React 19
- TypeScript
- PostgreSQL/SQLite
- Nodemailer для email

## 📝 Команды

```bash
# Разработка

pnpm dev

# Сборка

pnpm build

# Запуск production

pnpm start

# Генерация типов

pnpm generate:types
```

## 🤝 Поддержка

При возникновении вопросов:

1. Проверьте настройки в `.env`
2. Убедитесь, что база данных доступна
3. Проверьте логи в терминале

---

_Готовый production шаблон Payload CMS с аутентификацией, ролевой моделью и email системой._
