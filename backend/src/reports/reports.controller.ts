import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('sales')
  getSalesReport() {
    return this.reportsService.getSalesReport();
  }

  @Get('dashboard')
  getDashboardStats() {
    return this.reportsService.getDashboardStats();
  }
}