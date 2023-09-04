import { SafeParseReturnType } from "zod";

import { DataValidation } from "@/data/models";

export const zodValidationAdapter = <T, K>(zodValidationResponse: SafeParseReturnType<T, K>): DataValidation<K> => {
  const { success } = zodValidationResponse;

  if (!success)
    return {
      success: false,
      errors: zodValidationResponse.error.issues.map(issue => issue.message)
    };

  return {
    success: true,
    data: zodValidationResponse.data
  };
};
