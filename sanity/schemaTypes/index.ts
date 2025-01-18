import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { project } from './project'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, project, playlist],
}
