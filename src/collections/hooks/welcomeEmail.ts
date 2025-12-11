import { CollectionAfterChangeHook } from 'payload'

export const welcomeEmail: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create') {
    // Отправляем приветственное письмо новому пользователю
    await req.payload.sendEmail({
      to: doc.email,
      subject: 'Добро пожаловать в нашу систему!',
      html: `
          <h1>Добро пожаловать, ${doc.firstName}!</h1>
          <p>Ваш аккаунт был успешно создан.</p>
          <p>Теперь вы можете войти в систему используя ваши учетные данные.</p>
          <p>Если у вас возникнут вопросы, обратитесь в поддержку.</p>
        `,
    })
  }
}
