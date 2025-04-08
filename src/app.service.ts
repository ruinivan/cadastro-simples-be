import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  usuarios(): string {
    return 'Hello World!';
  }
}
