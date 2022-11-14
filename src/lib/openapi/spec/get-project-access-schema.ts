import { FromSchema } from 'json-schema-to-ts';
import { groupSchema } from './group-schema';
import { userSchema } from './user-schema';
import { roleSchema } from './role-schema';
// import { groupUserModelSchema } from './group-user-model-schema';

export const getProjectAccessSchema = {
    $id: '#/components/schemas/getProjectAccessSchema',
    type: 'object',
    additionalProperties: false,
    properties: {
        roles: {
            type: 'array',
            items: {
                $ref: '#/components/schemas/roleSchema',
            },
        },
        users: {
            type: 'array',
            items: {
                $ref: '#/components/schemas/userSchema',
            },
        },
        groups: {
            type: 'array',
            items: {
                $ref: '#/components/schemas/groupSchema',
            },
        },
    },
    components: {
        schemas: {
            groupSchema,
            // groupUserModelSchema,
            userSchema,
            roleSchema,
        },
    },
} as const;

export type GetProjectAccessSchema = FromSchema<typeof getProjectAccessSchema>;
