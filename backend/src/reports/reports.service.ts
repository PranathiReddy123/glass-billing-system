import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getSalesReport() {
    const invoices = await this.prisma.invoice.findMany();

    const totalInvoices = invoices.length;

    const totalSales = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    );

    return {
      totalInvoices,
      totalSales,
    };
  }

  async getDashboardStats() {
    const totalProducts = await this.prisma.product.count();

    const totalCustomers = await this.prisma.customer.count();

    const totalInvoices = await this.prisma.invoice.count();

    const invoices = await this.prisma.invoice.findMany();

    const totalSales = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    );

    return {
      totalProducts,
      totalCustomers,
      totalInvoices,
      totalSales,
    };
  }
}