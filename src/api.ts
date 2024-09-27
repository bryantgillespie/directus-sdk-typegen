export class ApiClient {
	private baseUrl: string;
	private headers: Record<string, string>;

	constructor(baseUrl = '', token = '') {
		this.baseUrl = baseUrl;
		this.headers = {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		};
	}

	setBaseUrl(url: string): void {
		this.baseUrl = url;
	}

	setToken(token: string): void {
		this.headers.Authorization = `Bearer ${token}`;
	}

	setHeader(key: string, value: string): void {
		this.headers[key] = value;
	}

	async fetch(endpoint: string): Promise<any> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, { headers: this.headers });
		if (!response.ok) {
			const body = await response.text();
			throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
		}
		return response.json();
	}
}
