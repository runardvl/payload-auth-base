import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок страницы',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'URL slug',
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Содержание страницы',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Мета-описание (SEO)',
    },
    {
      name: 'isHomePage',
      type: 'checkbox',
      label: 'Главная страница',
      defaultValue: false,
    },
  ],
}
