import { Controller, Get } from '@nestjs/common';
import { DummyService } from '../../service/dummy.service';

@Controller('/health/db')
export class DbHealthController {
  constructor(private readonly dummyService: DummyService) {}

  @Get()
  getDbHealth(): Promise<string> {
    return this.dummyService.findAll();
  }
}
