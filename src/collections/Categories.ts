import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название категории',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'URL slug',
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание категории',
    },
  ],
}
