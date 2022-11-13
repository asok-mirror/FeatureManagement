import { FromSchema } from 'json-schema-to-ts';

export const createProjectSchema = {
    $id: '#/components/schemas/createProjectSchema',
    type: 'object',
    additionalProperties: false,
    required: ['id', 'name'],
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        health: {
            type: 'number',
        },
        featureCount: {
            type: 'number',
        },
        memberCount: {
            type: 'number',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            nullable: true,
        },
    },
    components: {},
} as const;

export type CreateProjectSchema = FromSchema<typeof createProjectSchema>;
