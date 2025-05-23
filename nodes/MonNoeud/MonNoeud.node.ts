import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MonNoeud implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mon Noeud',
    name: 'monNoeud',
    icon: 'file:rightsurvey.svg',
    group: ['transform'],
    version: 1,
    description: 'Effectue une requête POST vers une API',
    defaults: {
      name: 'Mon Noeud',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'monApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.example.com',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Ressource',
        name: 'ressource',
        type: 'options',
        options: [
          {
            name: 'Utilisateur',
            value: 'utilisateur',
          },
        ],
        default: 'utilisateur',
      },
      {
        displayName: 'Opération',
        noDataExpression: true,
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            ressource: ['utilisateur'],
          },
        },
        options: [
          {
            name: 'Créer',
            value: 'creer',
            action: 'Creer un utilisateur',
            routing: {
              request: {
                method: 'POST',
                url: '/utilisateurs',
                body: {
                  nom: '={{$parameter.nom}}',
                  email: '={{$parameter.email}}',
                },
              },
            },
          },
        ],
        default: 'creer',
      },
      {
        displayName: 'Nom',
        name: 'nom',
        type: 'string',
        default: '',
        required: true,
      },
      {
        displayName: 'Email',
        placeholder: 'Email de l\'utilisateur',
        name: 'email',
        type: 'string',
        default: '',
        required: true,
      },
    ],
  };
}
