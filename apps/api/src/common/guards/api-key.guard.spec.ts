import { UnauthorizedException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { ExecutionContext } from "@nestjs/common";
import { ApiKeyGuard } from "./api-key.guard";

function contextWithKey(key?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        header: (name: string) => (name === "x-api-key" ? key : undefined),
      }),
    }),
  } as ExecutionContext;
}

describe("ApiKeyGuard", () => {
  const guard = new ApiKeyGuard({
    getOrThrow: () => "test-api-key-value",
  } as unknown as ConfigService);

  it("accepts the configured key", () => {
    expect(guard.canActivate(contextWithKey("test-api-key-value"))).toBe(true);
  });

  it("rejects a missing or different key", () => {
    expect(() => guard.canActivate(contextWithKey())).toThrow(
      UnauthorizedException,
    );
    expect(() => guard.canActivate(contextWithKey("short"))).toThrow(
      UnauthorizedException,
    );
    expect(() =>
      guard.canActivate(contextWithKey("test-api-key-wrong")),
    ).toThrow(UnauthorizedException);
  });
});
