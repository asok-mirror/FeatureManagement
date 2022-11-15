import { Request, Response } from 'express';
import Controller from '../../controller';
import { IUnleashConfig } from '../../../types/option';
import { IProject } from '../../../types/model';
import User, { IUser } from '../../../types/user';
import { AccessService } from '../../../services/access-service';
import { IUnleashServices } from '../../../types/services';
import ProjectFeaturesController from './features';
import EnvironmentsController from './environments';
import ProjectHealthReport from './health-report';
import ProjectService from '../../../services/project-service';
import VariantsController from './variants';
import { NONE } from '../../../types/permissions';
import {
    projectsSchema,
    ProjectsSchema,
} from '../../../openapi/spec/projects-schema';
import {
    projectSchema,
    ProjectSchema,
} from '../../../openapi/spec/project-schema';
import {
    CREATE_PROJECT
} from '../../../types/permissions';
import { IAuthRequest } from '../../unleash-types';
import { OpenApiService } from '../../../services/openapi-service';
import { serializeDates } from '../../../types/serialize-dates';
import { createResponseSchema } from '../../../openapi/util/create-response-schema';
import { emptyResponse } from '../../../openapi/util/standard-responses';
import { createRequestSchema } from '../../../openapi/util/create-request-schema';
import { extractUsername } from '../../../util/extract-user';

export default class ProjectApi extends Controller {
    private projectService: ProjectService;

    private openApiService: OpenApiService;

    private accessService: AccessService;

    constructor(
        config: IUnleashConfig, services: IUnleashServices) {
        super(config);
        this.projectService = services.projectService;
        this.openApiService = services.openApiService;
        this.accessService = services.accessService;

        this.route({
            path: '',
            method: 'get',
            handler: this.getProjects,
            permission: NONE,
            middleware: [
                services.openApiService.validPath({
                    tags: ['Projects'],
                    operationId: 'getProjects',
                    responses: {
                        200: createResponseSchema('projectsSchema'),
                    },
                }),
            ],
        });

        this.route({
            method: 'post',
            path: '/validate',
            handler: this.validateProjectID,
            permission: NONE,
            middleware: [
                services.openApiService.validPath({
                    tags: ['Projects'],
                    operationId: 'validateProjectID',
                    responses: { 200: emptyResponse },
                }),
            ],
        });

        this.route({
            method: 'post',
            path: '',
            handler: this.createProject,
            permission: CREATE_PROJECT,
            middleware: [
                services.openApiService.validPath({
                    tags: ['Projects'],
                    operationId: 'createProject',
                    requestBody: createRequestSchema('createProjectSchema'),
                    responses: { 200: createResponseSchema('projectSchema') },
                }),
            ],
        });

        this.route({
            method: 'get',
            path: '/:projectId/access',
            handler: this.getAccessToProject,
            permission: NONE,
            middleware: [
                services.openApiService.validPath({
                    tags: ['Projects'],
                    operationId: 'getUsersByRole',
                    // requestBody: createRequestSchema('createProjectSchema'),
                    responses: { 200: createResponseSchema('getProjectAccessSchema') },
                }),
            ],
        });

        this.route({
            method: 'post',
            path: '/:projectId/role/:roleId/access',
            handler: this.addAccessToProject,
            permission: CREATE_PROJECT,
            middleware: [
                services.openApiService.validPath({
                    tags: ['Projects'],
                    operationId: 'addAccessToProject',
                    responses: {
                        200: emptyResponse,
                    },
                }),
            ],
        });

        this.use('/', new ProjectFeaturesController(config, services).router);
        this.use('/', new EnvironmentsController(config, services).router);
        this.use('/', new ProjectHealthReport(config, services).router);
        this.use('/', new VariantsController(config, services).router);
    }

    async getProjects(
        req: Request,
        res: Response<ProjectsSchema>,
    ): Promise<void> {
        const projects = await this.projectService.getProjects({
            id: 'default',
        });

        this.openApiService.respondWithValidation(
            200,
            res,
            projectsSchema.$id,
            { version: 1, projects: serializeDates(projects) },
        );
    }

    async validateProjectID(
        req: Request,
        res: Response<boolean>,
    ): Promise<void> {
        const { id } = req.body;
        await this.projectService.validateId(
            id
        );

        res.status(200).end();       
    }

    async getAccessToProject(
        req: Request,
        res: Response,
    ): Promise<void> {
        const { projectId } = req.params;
        const accessDetails = await this.projectService.getAccessToProject(
            projectId
        ); 
        this.openApiService.respondWithValidation(
            201,
            res,
            projectsSchema.$id,
            serializeDates(accessDetails),
        );   
    }

    async createProject(
        req: IAuthRequest,
        res: Response<ProjectSchema>,
    ): Promise<void> {
        const { id, name, description } = req.body;
        const created = await this.projectService.createProject(
            {
                id: id,
                name: name,
                description: description,
                health: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            },            
            req.user
        );

        this.openApiService.respondWithValidation(
            201,
            res,
            projectSchema.$id,
            serializeDates(created),
        );
    }

    async addAccessToProject(
        req: IAuthRequest,
        res: Response<void>,
    ): Promise<void> {
        const { projectId, roleId } = req.params;    
        const createdBy = extractUsername(req);
        const { users, groups } = req.body; 
        await this.accessService.addAccessToProject(
            users,
            groups,
            projectId,
            +roleId,
            createdBy
        );
        res.status(200).end();  
    }
}
