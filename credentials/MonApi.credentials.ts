import {
    IAuthenticateGeneric,
    ICredentialType,
    INodeProperties,
  } from 'n8n-workflow';
  
  export class MonApi implements ICredentialType {
    name = 'monApi';
    displayName = 'Mon API';
    documentationUrl = 'https://api.example.com/docs';
    properties: INodeProperties[] = [
      {
        displayName: 'Clé API',
        name: 'apiKey',
        type: 'string',
        typeOptions: { password: true },
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
  