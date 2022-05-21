// ユーザープールの設定
const poolData = {
  UserPoolId: "ap-northeast-1_N90RiihWD", //【Pool Id　ユーザープールID】
  ClientId: "gn8u9684ar9kbpdhbetl74d42", //【App client id　アプリクライアントID】
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * 画面読み込み時の処理
 */
$(document).ready(function () {
  // Amazon Cognito 認証情報プロバイダーの初期化
  AWSCognito.config.region = "ap-northeast-1"; // リージョン
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-1:cfb301f8-4393-4e74-8ff1-5491f36dce0d", // 【Identity pool ID　IDプールのID】
  });

  // 「Activate」ボタン押下時
  $("#activationButton").click(function (event) {
    activate();
  });
});

/**
 * アクティベーション処理
 */
var activate = function () {
  var email = $("#email").val();
  var activationKey = $("#activationKey").val();

  // 何か1つでも未入力の項目がある場合、処理を中断
  if (!email | !activationKey) {
    return false;
  }

  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // アクティベーション処理
  cognitoUser.confirmRegistration(activationKey, true, function (err, result) {
    if (err) {
      // アクティベーション失敗の場合、エラーメッセージを画面に表示
      if (err.message != null) {
        $("div#message span").empty();
        $("div#message span").append(err.message);
      }
    } else {
      // TODO(チン):アクティベーション成功の場合、サインイン画面に遷移
    }
  });
};
