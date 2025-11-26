import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    // Отправляем тестовый email
    await payload.sendEmail({
      to: 'runarshakirov@gmail.com', // Ваш email для теста
      subject: '✅ Тест отправки email из Payload',
      html: `
        <h1>Email работает правильно!</h1>
        <p>Это тестовое письмо отправлено через Payload CMS + Nodemailer</p>
        <p>Время отправки: ${new Date().toLocaleString('ru-RU')}</p>
      `,
    })

    return Response.json({
      success: true,
      message: 'Тестовый email отправлен успешно!',
    })
  } catch (error) {
    console.error('❌ Ошибка отправки email:', error)

    return Response.json(
      {
        success: false,
        message: 'Ошибка отправки email',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
