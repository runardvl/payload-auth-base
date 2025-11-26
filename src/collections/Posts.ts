import { CollectionConfig } from 'payload'
import { BlocksFeature, CodeBlock } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок статьи',
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
      label: 'Содержание статьи',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Главное изображение',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Категории',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Теги',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Автор',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликовано', value: 'published' },
      ],
      defaultValue: 'draft',
      label: 'Статус',
    },
  ],
}
