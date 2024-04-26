import type { ErrorMessageMode } from "#/axios";



const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
//TODO: sessionTimeoutProcessing

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode:ErrorMessageMode = 'message'
): void{
  let errMessage = "";


  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined);
      // errMessage = msg || t("sys.api.errMsg401");
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true);
      // } else {
      //   // 被动登出，带redirect地址
      //   userStore.logout(false);
      // }
      break;
    case 403:
      errMessage = "The user is authorized, but access is forbidden!";
      break;
    // 404请求不存在
    case 404:
      errMessage = "Network request error, the resource was not found!";
      break;
    case 405:
      errMessage = "Network request error, request method not allowed!";
      break;
    case 408:
      errMessage = "Network request timed out!";
      break;
    case 500:
      errMessage = "Server error, please contact the administrator!";
      break;
    case 501:
      errMessage = "The network is not implemented!";
      break;
    case 502:
      errMessage = "Network Error!";
      break;
    case 503:
      errMessage = "The service is unavailable, the server is temporarily overloaded or maintained!";
      break;
    case 504:
      errMessage = "Network timeout!";
      break;
    case 505:
      errMessage = "The http version does not support the request!";
      break;
    default:
      break;
  }

  if (errMessage) {
    if (errorMessageMode === "modal") {
      createErrorModal({ title: '错误', content: errMessage });
    } else if (errorMessageMode === "message") {
      error({
        content: errMessage,
        key: `global_error_message_status_${status}`,
      });
    }
  }
}
