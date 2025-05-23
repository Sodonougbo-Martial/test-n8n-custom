import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class GetSurveys implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Get Surveys',
    name: 'getSurveys',
    icon: 'file:rightsurvey.svg',
    group: ['transform'],
    version: 1,
    description: 'Récupère la liste des sondages RightCom',
    defaults: {
      name: 'Get Surveys',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'surveyApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://rsv-api-beta.rightcomtech.com/api/v1',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Realms: '={{$parameter.realms}}',
      },
    },
    properties: [
      {
        displayName: 'Realms',
        name: 'realms',
        type: 'string',
        default: 'martial',
        required: true,
      },
      {
        displayName: 'Total',
        name: 'total',
        type: 'number',
        default: 10,
        routing: {
          request: {
            qs: {
              total: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Profil',
        name: 'profil',
        type: 'string',
        default: 'ADM',
        routing: {
          request: {
            qs: {
              profil: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Begin',
        name: 'begin',
        type: 'number',
        default: 1,
        routing: {
          request: {
            qs: {
              begin: '={{$value}}',
            },
          },
        },
      },
      {
        displayName: 'Lancer la requête',
        name: 'trigger',
        type: 'hidden',
        default: 'true',
        routing: {
          request: {
            url: '/survey',
            method: 'GET',
          },
        },
      },
    ],
  };
}
