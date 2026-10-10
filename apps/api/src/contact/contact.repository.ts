import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { UpdateContactDto } from "./dto/contact.dto";

export type ContactRecord = {
  email: string;
  linkedin: string;
  github: string;
  cvUrl: string;
};

const contactId = "default";

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<ContactRecord | null> {
    const row = await this.prisma.contact.findUnique({
      where: { id: contactId },
    });
    return row ? toContact(row) : null;
  }

  async upsert(input: UpdateContactDto): Promise<ContactRecord> {
    const current = await this.find();
    const next = {
      email: input.email ?? current?.email ?? "",
      linkedin: input.linkedin ?? current?.linkedin ?? "",
      github: input.github ?? current?.github ?? "",
      cvUrl: input.cvUrl ?? current?.cvUrl ?? "",
    };
    const row = await this.prisma.contact.upsert({
      where: { id: contactId },
      create: { id: contactId, ...next },
      update: next,
    });
    return toContact(row);
  }
}

function toContact(row: {
  email: string;
  linkedin: string;
  github: string;
  cvUrl: string;
}): ContactRecord {
  return {
    email: row.email,
    linkedin: row.linkedin,
    github: row.github,
    cvUrl: row.cvUrl,
  };
}
