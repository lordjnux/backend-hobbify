export class ResponseRepositories {
  error: boolean;
  message: string;
  data: any;

  constructor() {
    this.error = false;
    this.message = '';
    this.data = undefined;
  }
}
