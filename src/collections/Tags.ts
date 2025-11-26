import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название тега',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'URL slug',
      unique: true,
    },
  ],
}
