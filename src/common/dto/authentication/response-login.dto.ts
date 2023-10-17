export class ResponseLoginDTO {

  token: string;
  type: string;
  experiesIn: string;

  constructor(token: string, type: string, experiesIn: string) {
    this.token = token;
    this.type = type;
    this.experiesIn = experiesIn;
  }



}