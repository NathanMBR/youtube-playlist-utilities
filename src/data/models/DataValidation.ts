type SuccessDataValidation<T> = {
  success: true;
  data: T;
};

type FailureDataValidation = {
  success: false;
  errors: Array<string>;
};

export type DataValidation<T> = SuccessDataValidation<T> | FailureDataValidation;
