import { ContactService } from "./contact.service";
import type { ContactRepository } from "./contact.repository";

describe("ContactService", () => {
  it("returns empty channels when none are stored", async () => {
    const repository = {
      find: jest.fn().mockResolvedValue(null),
      upsert: jest.fn(),
    };
    const service = new ContactService(
      repository as unknown as ContactRepository,
    );

    await expect(service.get()).resolves.toEqual({
      email: "",
      linkedin: "",
      github: "",
      cvUrl: "",
    });
  });
});
