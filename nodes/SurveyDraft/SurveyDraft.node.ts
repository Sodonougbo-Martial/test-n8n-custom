//code fonctionnele a 100% avec collé les json dans le champs questions et form_data
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
				displayName: 'Nom Du Sondage',
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
				displayName: 'Id_ De L’utilisateur',
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
			// {
			// 	displayName: 'form_data',
			// 	name: 'form_data',
			// 	type: 'fixedCollection',
			// 	typeOptions: {
			// 		multipleValues: true,
			// 	},
			// 	default: [],
			// 	options: [
			// 		{
			// 			name: 'question',
			// 			displayName: 'Question',
			// 			values: [
			// 				{ displayName: 'Label', name: 'label', type: 'string', default: '' },
			// 				{ displayName: 'Key', name: 'key', type: 'string', default: '' },
			// 				{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			// 				{
			// 					displayName: 'Type',
			// 					name: 'type',
			// 					type: 'options',
			// 					options: [
			// 						{ name: 'Multiple Choice', value: 'multipleChoice' },
			// 						{ name: 'Text Field', value: 'textfield' },
			// 						{ name: 'Button', value: 'button' },
			// 					],
			// 					default: 'multipleChoice',
			// 				},
			// 				{ displayName: 'Input', name: 'input', type: 'boolean', default: true },
			// 				{ displayName: 'Required', name: 'required', type: 'boolean', default: false },
			// 				{ displayName: 'Hidden', name: 'hidden', type: 'boolean', default: false },
			// 				{ displayName: 'Placeholder', name: 'placeholder', type: 'string', default: '' },
			// 				{
			// 					displayName: 'Values (pour Multiple Choice)',
			// 					name: 'values',
			// 					type: 'string',
			// 					default: 'Option 1, Option 2, Option 3',
			// 				},
			// 				{
			// 					displayName: 'Label Position',
			// 					name: 'labelPosition',
			// 					type: 'string',
			// 					default: 'top',
			// 				},
			// 				{ displayName: 'Prefix', name: 'prefix', type: 'string', default: '' },
			// 				{ displayName: 'Suffix', name: 'suffix', type: 'string', default: '' },
			// 				{ displayName: 'Custom Class', name: 'customClass', type: 'string', default: '' },
			// 			],
			// 		},
			// 	],
			// },

			{
				displayName: 'Form_data',
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
							// { displayName: 'Key', name: 'key', type: 'string', default: '' },
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Email', value: 'email' },
									{ name: 'Fectch Browser', value: 'fetchBrowser' },
									{ name: 'File Upload', value: 'file' },
									{ name: 'Likert Scale', value: 'likert' },
									{ name: 'Multiple Choice', value: 'multipleChoice' },
									{ name: 'NPS', value: 'nps' },
									{ name: 'Phone Number', value: 'phoneNumber' },
									{ name: 'Text Field', value: 'textfield' },
									{ name: 'URL', value: 'url' },
								],
								default: 'multipleChoice',
							},
							//case de valeur pour des question specifique
							{
								displayName: 'Options De Mutliples Choix',
								name: 'values',
								displayOptions: {
									show: {
										type: ['multipleChoice'],
									}
								},
								type: 'string',
								default: 'Option 1, Option 2, Option 3',
								description: 'Séparer par des virgules',
							},

							{
								displayName: 'Options De Fetch Browser',
								name: 'value',
								displayOptions: {
									show: {
										type: ['fetchBrowser'],
									}
								},
								type: 'options',
								options: [
									{ name: 'Country', value: 'country' },
									{ name: 'Ip', value: 'ip' },
									{ name: 'Timezone', value: 'timezone' },
								],
								default: 'country',
							},


							{ displayName: 'Placeholder', name: 'placeholder', type: 'string', default: '' },
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
		// Initialiser un objet pour suivre les compteurs des types de composants
		const typeCounters: Record<string, number> = {};

		//fonction pour générer un composant selon le titre
		function buildFormComponent(question: any, typeCounters: Record<string, number>): any {
			const base = {
				label: question.label,
				key: '',
				description: '',
				placeholder: question.placeholder || '',
				input: true,
				hidden: false,
				persistent: true,
				clearOnHide: true,
				refreshOn: '',
				redrawOn: '',
				labelPosition: 'top',
				tooltip: '',
				type: '',
				validate: {
					required: false,
					custom: '',
					customPrivate: false,
					strictDateValidation: false,
					multiple: false,
					unique: false,
					onlyAvailableItems: false,
				},
				conditional: {
					show: null,
					when: null,
					eq: '',
				},
				logic: [],
				inputType: 'text',
				attributes: {},
				validateOn: 'change',
				overlay: {
					style: '',
					left: '',
					top: '',
					width: '',
					height: '',
				},
				properties: {},
				allowCalculateOverride: false,
				encrypted: false,
				showCharCount: false,
				showWordCount: false,
				allowMultipleMasks: false,
				addons: [],
				id: Math.random().toString(36).substring(2, 8),
			};

			// Incrémenter le compteur pour le type de composant
			if (!typeCounters[question.type]) {
				typeCounters[question.type] = 0;
			}

			// Générer une clé unique pour le composant
			typeCounters[question.type]++;
			base.key =
				typeCounters[question.type] === 1
					? question.type
					: `${question.type}${typeCounters[question.type] - 1}`;

			// Assigner le type de composant
			if (question.type === 'multipleChoice') {
				return {
					...base,
					type: 'multipleChoice',
					values: (question.values || '').split(',').map((val: string) => ({
						label: val.trim(),
						value: val.trim().toLowerCase().replace(/\s+/g, '-'),
						shortcut: '',
					})),
					template: '<span>{{ item.label }}</span>',
					dataSrc: 'values',
				};
			}

			if (question.type === 'textfield') {
				return {
					...base,
					type: 'textarea',
					tableView: true,
					dataGridLabel: false,
					widget: { type: 'input' },
					spellcheck: true,
					rows: 3,
					wysiwyg: false,
					editor: '',
					fixedSize: true,
					inputFormat: 'html',
				};
			}

			if (question.type === 'email') {
				return {
					...base,
					type: 'email',
					inputType: 'email',
					tableView: true,
					spellcheck: question.spellcheck || true,
					truncateMultipleSpaces: question.truncateMultipleSpaces || false,
					kickbox: question.kickbox || { enabled: false },
				};
			}

			if (question.type === 'phoneNumber') {
				return {
					...base,
					type: 'phoneNumber',
					inputType: 'tel',
					inputMask: question.inputMask || '',
					tableView: true,
					spellcheck: question.spellcheck || true,
					truncateMultipleSpaces: question.truncateMultipleSpaces || false,
					prefix: question.prefix || '',
					suffix: question.suffix || '',
				};
			}

			if (question.type === 'url') {
				return {
					...base,
					type: 'url',
					inputType: 'url',
					tableView: true,
					spellcheck: question.spellcheck || true,
					truncateMultipleSpaces: question.truncateMultipleSpaces || false,
					prefix: question.prefix || '',
					suffix: question.suffix || '',
					inputMask: question.inputMask || '',
					placeholder: question.placeholder || '',
				};
			}

			if (question.type === 'nps') {
				return {
					...base,
					type: 'nps',
					inputType: 'radio',
					inline: true,
					tableView: false,
					label: question.label || 'How likely are you to recommend this brand to a colleague, friend or relative ?',
					optionsLabelPosition: question.optionsLabelPosition || 'right',
					values: question.values || [
						{ label: '0', value: 0 },
						{ label: '1', value: 1 },
						{ label: '2', value: 2 },
						{ label: '3', value: 3 },
						{ label: '4', value: 4 },
						{ label: '5', value: 5 },
						{ label: '6', value: 6 },
						{ label: '7', value: 7 },
						{ label: '8', value: 8 },
						{ label: '9', value: 9 },
						{ label: '10', value: 10 },
					],
					template: question.template || '<span>{{ item.label }}</span>',
					dataSrc: question.dataSrc || 'values',
				};
			}

			if (question.type === 'file') {
				return {
					...base,
					type: 'file',
					storage: question.storage || 'cdnrightcom',
					filePattern: question.filePattern || {},
					fileMinSize: question.fileMinSize || '0KB',
					fileMaxSize: question.fileMaxSize || '1GB',
					tableView: question.tableView || false,
					image: question.image || false,
					privateDownload: question.privateDownload || false,
					uploadOnly: question.uploadOnly || false,
					imageSize: question.imageSize || '200',
				};
			}

			if (question.type === 'fetchBrowser') {
				return {
					...base,
					type: 'fetchBrowser',
					hidden: true,
					fetchbrowser	: question.value,
					inputType: 'text',
					tableView: true,
					spellcheck: question.spellcheck || true,
					truncateMultipleSpaces: question.truncateMultipleSpaces || false,
					fetchData: question.fetchData || {},
				};
			}

			if (question.type === 'likert') {
				return {
					...base,
					type: 'likert',
					inputType: 'radio',
					inline: true,
					tableView: false,
					label: question.label,
					optionsLabelPosition: question.optionsLabelPosition || 'right',
					template: question.template || '<span>{{ item.label }}</span>',
					dataSrc: question.dataSrc || 'values',
				};
			}

			return base;
		}

		//fonction pour gen,eré un composant selon le titre
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
			//const formDataParsed = rawFormData.question.map(buildFormComponent);
			const formDataParsed = rawFormData.question.map((question) =>
				buildFormComponent(question, typeCounters),
			);

			//const rawFormData = this.getNodeParameter('form_data', i) as { question: any[] };
			// const formDataParsed = rawFormData.question.map((q) => {
			// 	const values = (q.values || '').split(',').map((v: string) => ({
			// 		label: v.trim(),
			// 		value: v.trim().toLowerCase().replace(/\s+/g, ''),
			// 		shortcut: '',
			// 	}));

			// 	return {
			// 		type: q.type,
			// 		label: q.label,
			// 		key: q.type || q.key || q.label.toLowerCase().replace(/\s+/g, '_'),
			// 		description: q.description || '',
			// 		input: q.input ?? true,
			// 		hidden: q.hidden ?? false,
			// 		placeholder: q.placeholder || '',
			// 		prefix: q.prefix || '',
			// 		suffix: q.suffix || '',
			// 		customClass: q.customClass || '',
			// 		labelPosition: q.labelPosition || 'top',
			// 		validate: {
			// 			required: q.required ?? false,
			// 			custom: '',
			// 			customPrivate: false,
			// 			strictDateValidation: false,
			// 			multiple: false,
			// 			unique: false,
			// 			onlyAvailableItems: false,
			// 		},
			// 		values: q.type === 'multipleChoice' ? values : [],
			// 		conditional: {
			// 			show: null,
			// 			when: null,
			// 			eq: '',
			// 		},
			// 		logic: [],
			// 		persistent: true,
			// 		clearOnHide: true,
			// 		refreshOn: '',
			// 		redrawOn: '',
			// 		tableView: false,
			// 		modalEdit: false,
			// 		dataGridLabel: false,
			// 		errorLabel: '',
			// 		tooltip: '',
			// 		tabindex: '',
			// 		dbIndex: false,
			// 		customDefaultValue: '',
			// 		calculateValue: '',
			// 		calculateServer: false,
			// 		widget: null,
			// 		attributes: {},
			// 		validateOn: 'change',
			// 		overlay: {
			// 			style: '',
			// 			left: '',
			// 			top: '',
			// 			width: '',
			// 			height: '',
			// 		},
			// 		allowCalculateOverride: false,
			// 		encrypted: false,
			// 		showCharCount: false,
			// 		showWordCount: false,
			// 		properties: {},
			// 		allowMultipleMasks: false,
			// 		addons: [],
			// 		dataSrc: 'values',
			// 		authenticate: false,
			// 		ignoreCache: false,
			// 		template: '<span>{{ item.label }}</span>',
			// 		inputType: 'checkbox',
			// 		data: {
			// 			url: '',
			// 		},
			// 		fieldSet: false,
			// 		id: Math.random().toString(36).substring(2, 8),
			// 	};
			// });

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
