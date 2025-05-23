import {
    IAuthenticateGeneric,
    ICredentialType,
    INodeProperties,
  } from 'n8n-workflow';
  
  export class SurveyApi implements ICredentialType {
    name = 'surveyApi';
    displayName = 'Survey API';
    documentationUrl = 'https://rsv-api-beta.rightcomtech.com/docs';
    properties: INodeProperties[] = [
      {
        displayName: 'Clé API',
        name: 'apiKey',
        type: 'string',
        default: '',
      },
    ];
  
    authenticate: IAuthenticateGeneric = {
      type: 'generic',
      properties: {
        headers: {
          Authorization: '={{"Bearer " + $credentials.apiKey}}',
        },
      },
    };
  }
  