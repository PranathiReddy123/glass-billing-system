import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: {
    customerId: number;
    productId: number;
    quantity: number;
  }) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    if (!product) {
        throw new BadRequestException('Product not found');
    }

    if (data.quantity > product.stock) {
        throw new BadRequestException('Not enough stock');
    }



    const total = data.quantity * product.rate;
    await this.prisma.product.update({
  where: {
    id: data.productId,
  },
  data: {
    stock: product.stock - data.quantity,
  },
});

    return this.prisma.invoice.create({
      data: {
        customerId: data.customerId,
        productId: data.productId,
        quantity: data.quantity,
        total,
      },
    });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: {
        customer: true,
        product: true,
      },
    });
  }
}