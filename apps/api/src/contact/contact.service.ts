import { Injectable } from "@nestjs/common";
import { ContactRepository, type ContactRecord } from "./contact.repository";
import type { UpdateContactDto } from "./dto/contact.dto";

const emptyContact: ContactRecord = {
  email: "",
  linkedin: "",
  github: "",
  cvUrl: "",
};

@Injectable()
export class ContactService {
  constructor(private readonly contact: ContactRepository) {}

  async get(): Promise<ContactRecord> {
    return (await this.contact.find()) ?? emptyContact;
  }

  update(input: UpdateContactDto): Promise<ContactRecord> {
    return this.contact.upsert(input);
  }
}
