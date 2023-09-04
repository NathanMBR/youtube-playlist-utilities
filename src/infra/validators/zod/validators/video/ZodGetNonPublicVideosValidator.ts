import {
  zodGetNonPublicVideosSchema,
  zodValidationAdapter
} from "@/infra/validators";
import { GetNonPublicVideosValidator } from "@/data/validators";

export class ZodGetNonPublicVideosValidator implements GetNonPublicVideosValidator {
  validate(request: GetNonPublicVideosValidator.Request): GetNonPublicVideosValidator.Response {
    const validationResponse = zodGetNonPublicVideosSchema.safeParse(request);

    return zodValidationAdapter(validationResponse);
  }
}
