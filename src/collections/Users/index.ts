import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['username', 'name', 'email'],
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true,
    }
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      // Payload hides its built-in email input for username-only authentication.
      // Override the hidden field component so email remains an optional profile field.
      name: 'email',
      type: 'email',
      admin: {
        components: {
          Field: '@payloadcms/ui#EmailField',
        },
      },
    },
  ],
  timestamps: true,
}
