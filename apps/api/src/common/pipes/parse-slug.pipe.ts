import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable()
export class ParseSlugPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!slugPattern.test(value)) {
      throw new BadRequestException("Invalid slug");
    }

    return value;
  }
}
