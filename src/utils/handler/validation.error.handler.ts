interface ErrorKey {
  msg: string;
  //   value: string;
  param: string;
  location: string;
}

const getValidationReport = (errorObject: any): string[] => {
  const errorMessage = errorObject?.map((_err: any) => {
    return _err.msg;
  });
  return errorMessage;
};

export default getValidationReport;
