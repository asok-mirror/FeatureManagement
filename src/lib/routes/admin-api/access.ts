import { Request, Response } from 'express';
import Controller from '../controller';
import { IUnleashConfig, IUnleashServices } from '../../types';
import { Logger } from '../../logger';
import { AccessService } from '../../services/access-service';
import { NONE } from '../../types/permissions';
import { IAuthRequest } from '../unleash-types';
import { createRequestSchema } from '../../openapi/util/create-request-schema';
import { createResponseSchema } from '../../openapi/util/create-response-schema';
import { OpenApiService } from '../../services/openapi-service';
import { RoleSchema, roleSchema } from '../../openapi/spec/role-schema';
import { serializeDates } from '../../types/serialize-dates';
import { emptyResponse } from '../../openapi/util/standard-responses';

type AccessServices = Pick<IUnleashServices, 'accessService' | 'openApiService'>;

const PATH = '/';

class AccessController extends Controller {
    private logger: Logger;

    private accessService: AccessService;

    private openApiService: OpenApiService;

    constructor(
        config: IUnleashConfig,
        { accessService, openApiService }: AccessServices,
    ) {
        super(config);
        this.logger = config.getLogger('/admin-api/access.ts');
        this.accessService = accessService;
        this.openApiService = openApiService;

        this.route({
            method: 'get',
            path: '/:roleId',
            handler: this.getRoleById,
            permission: NONE,
            middleware: [
                openApiService.validPath({
                    tags: ['Access'],
                    operationId: 'getRoleById',
                    responses: {
                        200: createResponseSchema('roleSchema'),
                    },
                }),
            ],
        });      
      
    }

    async getRoleById(
        req: Request,
        res: Response<RoleSchema>,
    ): Promise<void> {
        const { roleId } = req.params;      
        const overview = await this.accessService.getRoleById(
            +roleId
        );
        this.openApiService.respondWithValidation(
            200,
            res,
            roleSchema.$id,
            serializeDates(overview),
        );
    }
}

export default AccessController;
module.exports = AccessController;
