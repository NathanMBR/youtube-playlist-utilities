import {
  describe,
  it,
  expect
} from "vitest";
import { ZodError } from "zod";

import { zodValidationAdapter } from "./zodValidationAdapter";

describe("zodValidationAdapter", () => {
  it("should successfully adapt a zod schema validation response", () => {
    const SUTResponse = zodValidationAdapter(
      {
        success: true,
        data: {
          test: "Test data"
        }
      }
    );

    const expectedResponse = {
      success: true,
      data: {
        test: "Test data"
      }
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return error response when zod validation fails", () => {
    const SUTResponse = zodValidationAdapter(
      {
        success: false,
        error: new ZodError(
          [
            {
              code: "custom",
              path: ["test"],
              message: "Test error"
            }
          ]
        )
      }
    );

    const expectedResponse = {
      success: false,
      errors: [
        "Test error"
      ]
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });

  it("should return all error messages returned by zod validator", () => {
    const SUTResponse = zodValidationAdapter(
      {
        success: false,
        error: new ZodError(
          [
            {
              code: "custom",
              path: ["test1"],
              message: "Test error 1"
            },

            {
              code: "custom",
              path: ["test2"],
              message: "Test error 2"
            },

            {
              code: "custom",
              path: ["test3"],
              message: "Test error 3"
            }
          ]
        )
      }
    );

    const expectedResponse = {
      success: false,
      errors: [
        "Test error 1",
        "Test error 2",
        "Test error 3"
      ]
    };

    expect(SUTResponse).toEqual(expectedResponse);
  });
});
