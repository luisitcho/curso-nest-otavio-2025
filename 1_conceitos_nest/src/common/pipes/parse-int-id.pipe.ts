import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(
      'ParseIntIdPipe: Transforming value',
      value,
      'with metadata',
      metadata,
    );
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value; // If not a param or not 'id', return the value as is
    }

    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new BadRequestException('ParseIntIdPipe espera um número válido');
    }

    if (parsedValue <= 0) {
      throw new BadRequestException('ParseIntIdPipe espera um número positivo');
    }

    return value;
  }
}
