export class ResponseToControllers {
  status: number;
  message: string;
  data: any;

  constructor() {
    this.status = 0;
    this.message = '';
    this.data = undefined;
  }
}
