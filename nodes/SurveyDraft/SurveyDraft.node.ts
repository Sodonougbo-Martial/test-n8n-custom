//code fonctionnele a 100% avec collé les json dans le champs questions et form_data
// import {
// 	INodeExecutionData,
// 	INodeType,
// 	INodeTypeDescription,
// 	IExecuteFunctions,
// } from 'n8n-workflow';

// export class SurveyDraft implements INodeType {
// 	description: INodeTypeDescription = {
// 		displayName: 'Survey Draft',
// 		name: 'surveyDraft',
// 		icon: 'file:surveyDraft.svg',
// 		group: ['transform'],
// 		version: 1,
// 		description: 'Crée un brouillon de sondage via l’API RightCom',
// 		defaults: {
// 			name: 'Survey Draft',
// 		},
// 		inputs: ['main'],
// 		outputs: ['main'],
// 		credentials: [
// 			{
// 				name: 'surveyApi',
// 				required: true,
// 			},
// 		],
// 		properties: [
// 			{
// 				displayName: 'Nom du sondage',
// 				name: 'name',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'Description',
// 				name: 'description',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'ID de l’utilisateur',
// 				name: 'userId',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'Type',
// 				name: 'type',
// 				type: 'string',
// 				default: 'formbuilder',
// 			},
// 			{
// 				displayName: 'Questions',
// 				name: 'questions',
// 				type: 'json',
// 				default: [],
// 			},
// 			{
// 				displayName: 'form_data',
// 				name: 'form_data',
// 				type: 'json',
// 				default: [],
// 				routing: {
// 					send: {
// 						property: 'form_data',
// 						type: 'body',
// 					},
// 				},
// 			},
// 			{
// 				displayName: 'Settings (JSON)',
// 				name: 'settings',
// 				type: 'json',
// 				default: {},
// 			},
// 			{
// 				displayName: 'Realms',
// 				name: 'realms',
// 				type: 'string',
// 				default: 'martial',
// 			},
// 		],
// 	};

// 	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
// 		const items = this.getInputData();
// 		const returnData: INodeExecutionData[] = [];

// 		for (let i = 0; i < items.length; i++) {
// 			const name = this.getNodeParameter('name', i) as string;
// 			const description = this.getNodeParameter('description', i) as string;
// 			const userId = this.getNodeParameter('userId', i) as string;
// 			const type = this.getNodeParameter('type', i) as string;
// 			const realms = this.getNodeParameter('realms', i) as string;

// 			// Parse JSON string if provided as text in the n8n form field
// 			const rawQuestions = this.getNodeParameter('questions', i);
// 			const rawformData = this.getNodeParameter('form_data', i);
// 			const rawSettings = this.getNodeParameter('settings', i);

// 			const questionsParse =
// 				typeof rawQuestions === 'string' ? JSON.parse(rawQuestions) : rawQuestions;
// 			const formDataParse = typeof rawformData === 'string' ? JSON.parse(rawformData) : rawformData;
// 			const settingsParse = typeof rawSettings === 'string' ? JSON.parse(rawSettings) : rawSettings;

// 			const payload = {
// 				name,
// 				description,
// 				userId: userId,
// 				type,
// 				questions: questionsParse,
// 				form_data: formDataParse,
// 				settings: settingsParse,
// 			};

// 			console.log('PAYLOAD:', JSON.stringify(payload, null, 2));

// 			const response = await this.helpers.httpRequestWithAuthentication.call(this, 'surveyApi', {
// 				method: 'POST',
// 				url: 'https://rsv-api-beta.rightcomtech.com/api/v1/survey/draft',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: 'application/json',
// 					Realms: realms,
// 				},
// 				body: payload,
// 				json: true,
// 			});

// 			returnData.push({ json: response });
// 		}

// 		return [returnData];
// 	}
// }

// import {
// 	INodeExecutionData,
// 	INodeType,
// 	INodeTypeDescription,
// 	IExecuteFunctions,
// } from 'n8n-workflow';

// export class SurveyDraft implements INodeType {
// 	description: INodeTypeDescription = {
// 		displayName: 'Survey Draft',
// 		name: 'surveyDraft',
// 		icon: 'file:surveyDraft.svg',
// 		group: ['transform'],
// 		version: 1,
// 		description: 'Crée un brouillon de sondage via l’API RightCom',
// 		defaults: {
// 			name: 'Survey Draft',
// 		},
// 		inputs: ['main'],
// 		outputs: ['main'],
// 		credentials: [
// 			{
// 				name: 'surveyApi',
// 				required: true,
// 			},
// 		],
// 		properties: [
// 			{
// 				displayName: 'Nom du sondage',
// 				name: 'name',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'Description',
// 				name: 'description',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'ID de l’utilisateur',
// 				name: 'userId',
// 				type: 'string',
// 				default: '',
// 			},
// 			{
// 				displayName: 'Type',
// 				name: 'type',
// 				type: 'string',
// 				default: 'formbuilder',
// 			},
// 			{
// 				displayName: 'Questions',
// 				name: 'questions',
// 				type: 'json',
// 				default: [],
// 			},
// 			// {
// 			// 	displayName: 'form_data',
// 			// 	name: 'form_data',
// 			// 	type: 'json',
// 			// 	default: [],
// 			// 	routing: {
// 			// 		send: {
// 			// 			property: 'form_data',
// 			// 			type: 'body',
// 			// 		},
// 			// 	},
// 			// },

// 			{
// 				displayName: 'form_data',
// 				name: 'form_data',
// 				type: 'fixedCollection',
// 				typeOptions: {
// 					multipleValues: true,
// 				},
// 				default: [],
// 				options: [
// 					{
// 						name: 'question',
// 						displayName: 'Question',
// 						values: [
// 							{
// 								displayName: 'Label',
// 								name: 'label',
// 								type: 'string',
// 								default: '',
// 							},
// 							{
// 								displayName: 'Type',
// 								name: 'type',
// 								type: 'options',
// 								options: [
// 									{ name: 'Multiple Choice', value: 'multipleChoice' },
// 									{ name: 'Input Text', value: 'textfield' },
// 								],
// 								default: 'multipleChoice',
// 							},
// 							{
// 								displayName: 'Options (si multiple choice)',
// 								name: 'values',
// 								type: 'string',
// 								default: 'Option 1, Option 2, Option 3',
// 								description: 'Séparer par des virgules',
// 							},
// 						],
// 					},
// 				],
// 			},

// 			{
// 				displayName: 'Settings (JSON)',
// 				name: 'settings',
// 				type: 'json',
// 				default: {},
// 			},
// 			{
// 				displayName: 'Realms',
// 				name: 'realms',
// 				type: 'string',
// 				default: 'martial',
// 			},
// 		],
// 	};

// 	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
// 		const items = this.getInputData();
// 		const returnData: INodeExecutionData[] = [];

// 		for (let i = 0; i < items.length; i++) {
// 			const name = this.getNodeParameter('name', i) as string;
// 			const description = this.getNodeParameter('description', i) as string;
// 			const userId = this.getNodeParameter('userId', i) as string;
// 			const type = this.getNodeParameter('type', i) as string;
// 			const realms = this.getNodeParameter('realms', i) as string;

// 			// Parse JSON string if provided as text in the n8n form field
// 			const rawQuestions = this.getNodeParameter('questions', i);
// 			//const rawformData = this.getNodeParameter('form_data', i);
// 			const rawFormData = this.getNodeParameter('form_data', i) as { question: any[] };
// const formDataParsed = rawFormData.question.map((q) => {
//   const valuesArray = q.values.split(',').map((v: string) => ({
//     label: v.trim(),
//     value: v.trim().toLowerCase().replace(/\s+/g, '-'),
//     shortcut: '',
//   }));

//   return {
//     type: q.type,
//     label: q.label,
//     //key: q.label.toLowerCase().replace(/\s+/g, '_'),
// 		key: q.type,
//     values: q.type === 'multipleChoice' ? valuesArray : [],
//     validate: { required: false },
//     input: true,
//   };
// });
// // Bouton submit
// const submitButton = {
// 	type: 'button',
// 	label: 'Submit',
// 	key: 'submit',
// 	values: [],
// 	size: 'md',
// 	block: false,
// 	action: 'submit',
// 	disableOnInvalid: true,
// 	theme: 'primary',
// 	id: 'submit_btn',
// 	input: true,
// 	persistent: false,
// 	clearOnHide: true,
// 	tableView: false,
// 	dataGridLabel: true,
// 	labelPosition: 'top',
// 	hidden: false,
// 	autofocus: false,
// 	widget: { type: 'input' },
// 	validate: { required: false },
// 	conditional: { show: null, when: null, eq: '' },
// 	overlay: { style: '', left: '', top: '', width: '', height: '' },
// 	encrypted: false,
// 	showCharCount: false,
// 	showWordCount: false,
// 	properties: {},
// 	allowMultipleMasks: false,
// 	addons: [],
// };

// // Ajout du bouton à la fin
// formDataParsed.push(submitButton);
// 			const rawSettings = this.getNodeParameter('settings', i);
// 			const questionsParse =
// 				typeof rawQuestions === 'string' ? JSON.parse(rawQuestions) : rawQuestions;
// 			//const formDataParse = typeof rawformData === 'string' ? JSON.parse(rawformData) : rawformData;
// 			const settingsParse = typeof rawSettings === 'string' ? JSON.parse(rawSettings) : rawSettings;

// 			const payload = {
// 				name,
// 				description,
// 				userId: userId,
// 				type,
// 				questions: questionsParse,
// 				//form_data: formDataParse,
// 				form_data: formDataParsed,
// 				settings: settingsParse,
// 			};

// 			console.log('PAYLOAD:', JSON.stringify(payload, null, 2));

// 			const response = await this.helpers.httpRequestWithAuthentication.call(this, 'surveyApi', {
// 				method: 'POST',
// 				url: 'https://rsv-api-beta.rightcomtech.com/api/v1/survey/draft',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: 'application/json',
// 					Realms: realms,
// 				},
// 				body: payload,
// 				json: true,
// 			});

// 			returnData.push({ json: response });
// 		}

// 		return [returnData];
// 	}
// }

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';

export class SurveyDraft implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Survey Draft',
		name: 'surveyDraft',
		icon: 'file:rightsurvey.svg',
		group: ['transform'],
		version: 1,
		description: 'Crée un brouillon de sondage via l’API RightCom',
		defaults: {
			name: 'Survey Draft',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'surveyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Nom du sondage',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'ID de l’utilisateur',
				name: 'userId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: 'formbuilder',
			},
			{
				displayName: 'Entrypoint',
				name: 'entrypoint',
				type: 'string',
				default: 'formio',
			},
			{
				displayName: 'Questions',
				name: 'questions',
				type: 'json',
				default: [],
			},
			{
				displayName: 'form_data',
				name: 'form_data',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				options: [
					{
						name: 'question',
						displayName: 'Question',
						values: [
							{ displayName: 'Label', name: 'label', type: 'string', default: '' },
							{ displayName: 'Key', name: 'key', type: 'string', default: '' },
							{ displayName: 'Description', name: 'description', type: 'string', default: '' },
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Multiple Choice', value: 'multipleChoice' },
									{ name: 'Text Field', value: 'textfield' },
									{ name: 'Button', value: 'button' },
								],
								default: 'multipleChoice',
							},
							{ displayName: 'Input', name: 'input', type: 'boolean', default: true },
							{ displayName: 'Required', name: 'required', type: 'boolean', default: false },
							{ displayName: 'Hidden', name: 'hidden', type: 'boolean', default: false },
							{ displayName: 'Placeholder', name: 'placeholder', type: 'string', default: '' },
							{
								displayName: 'Values (pour Multiple Choice)',
								name: 'values',
								type: 'string',
								default: 'Option 1, Option 2, Option 3',
							},
							{
								displayName: 'Label Position',
								name: 'labelPosition',
								type: 'string',
								default: 'top',
							},
							{ displayName: 'Prefix', name: 'prefix', type: 'string', default: '' },
							{ displayName: 'Suffix', name: 'suffix', type: 'string', default: '' },
							{ displayName: 'Custom Class', name: 'customClass', type: 'string', default: '' },
						],
					},
				],
			},

			{
				displayName: 'Settings (JSON)',
				name: 'settings',
				type: 'json',
				default: {},
			},
			{
				displayName: 'Realms',
				name: 'realms',
				type: 'string',
				default: 'martial',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const name = this.getNodeParameter('name', i) as string;
			const description = this.getNodeParameter('description', i) as string;
			const userId = this.getNodeParameter('userId', i) as string;
			const type = this.getNodeParameter('type', i) as string;
			const entrypoint = this.getNodeParameter('entrypoint', i) as string;
			const realms = this.getNodeParameter('realms', i) as string;

			// Parse JSON string if provided as text in the n8n form field
			const rawQuestions = this.getNodeParameter('questions', i);
			const rawFormData = this.getNodeParameter('form_data', i) as { question: any[] };

			const formDataParsed = rawFormData.question.map((q) => {
				const values = (q.values || '').split(',').map((v: string) => ({
					label: v.trim(),
					value: v.trim().toLowerCase().replace(/\s+/g, ''),
					shortcut: '',
				}));

				return {
					type: q.type,
					label: q.label,
					key: q.type || q.key || q.label.toLowerCase().replace(/\s+/g, '_'),
					description: q.description || '',
					input: q.input ?? true,
					hidden: q.hidden ?? false,
					placeholder: q.placeholder || '',
					prefix: q.prefix || '',
					suffix: q.suffix || '',
					customClass: q.customClass || '',
					labelPosition: q.labelPosition || 'top',
					validate: {
						required: q.required ?? false,
						custom: '',
						customPrivate: false,
						strictDateValidation: false,
						multiple: false,
						unique: false,
						onlyAvailableItems: false,
					},
					values: q.type === 'multipleChoice' ? values : [],
					conditional: {
						show: null,
						when: null,
						eq: '',
					},
					logic: [],
					persistent: true,
					clearOnHide: true,
					refreshOn: '',
					redrawOn: '',
					tableView: false,
					modalEdit: false,
					dataGridLabel: false,
					errorLabel: '',
					tooltip: '',
					tabindex: '',
					dbIndex: false,
					customDefaultValue: '',
					calculateValue: '',
					calculateServer: false,
					widget: null,
					attributes: {},
					validateOn: 'change',
					overlay: {
						style: '',
						left: '',
						top: '',
						width: '',
						height: '',
					},
					allowCalculateOverride: false,
					encrypted: false,
					showCharCount: false,
					showWordCount: false,
					properties: {},
					allowMultipleMasks: false,
					addons: [],
					dataSrc: 'values',
					authenticate: false,
					ignoreCache: false,
					template: '<span>{{ item.label }}</span>',
					inputType: 'checkbox',
					data: {
						url: '',
					},
					fieldSet: false,
					id: Math.random().toString(36).substring(2, 8),
				};
			});

			// Bouton submit
			const submitButton = {
				type: 'button',
				label: 'Submit',
				key: 'submit',
				description: '',
				input: true,
				hidden: false,
				placeholder: '',
				prefix: '',
				suffix: '',
				customClass: '',
				labelPosition: 'top',
				validate: {
					required: false,
					custom: '',
					customPrivate: false,
					strictDateValidation: false,
					multiple: false,
					unique: false,
					onlyAvailableItems: false,
				},
				values: [],
				conditional: { show: null, when: null, eq: '' },
				logic: [],
				persistent: false,
				clearOnHide: true,
				refreshOn: '',
				redrawOn: '',
				tableView: false,
				modalEdit: false,
				dataGridLabel: true,
				errorLabel: '',
				tooltip: '',
				tabindex: '',
				dbIndex: false,
				customDefaultValue: '',
				calculateValue: '',
				calculateServer: false,
				widget: null,
				attributes: {},
				validateOn: 'change',
				overlay: { style: '', left: '', top: '', width: '', height: '' },
				allowCalculateOverride: false,
				encrypted: false,
				showCharCount: false,
				showWordCount: false,
				properties: {},
				allowMultipleMasks: false,
				addons: [],
				dataSrc: 'values',
				authenticate: false,
				ignoreCache: false,
				template: '<span>{{ item.label }}</span>',
				inputType: 'checkbox',
				data: { url: '' },
				fieldSet: false,
				id: Math.random().toString(36).substring(2, 8),
				size: 'md',
				block: false,
				action: 'submit',
				disableOnInvalid: true,
				theme: 'primary',
				autofocus: false,
			};

			// Ajout du bouton à la fin
			formDataParsed.push(submitButton);

			const rawSettings = this.getNodeParameter('settings', i);
			const questionsParse =
				typeof rawQuestions === 'string' ? JSON.parse(rawQuestions) : rawQuestions;
			const settingsParse = typeof rawSettings === 'string' ? JSON.parse(rawSettings) : rawSettings;

			const payload = {
				name,
				description,
				userId: userId,
				entrypoint: entrypoint,
				type,
				questions: questionsParse,
				form_data: formDataParsed,
				settings: settingsParse,
			};

			console.log('PAYLOAD:', JSON.stringify(payload, null, 2));

			const response = await this.helpers.httpRequestWithAuthentication.call(this, 'surveyApi', {
				method: 'POST',
				url: 'https://rsv-api-beta.rightcomtech.com/api/v1/survey/draft',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Realms: realms,
				},
				body: payload,
				json: true,
			});

			returnData.push({ json: response });
		}

		return [returnData];
	}
}
