// ユーザープールの設定
const poolData = {
  UserPoolId: "ap-northeast-1_N90RiihWD", //【Pool Id　ユーザープールID】
  ClientId: "gn8u9684ar9kbpdhbetl74d42", //【App client id　アプリクライアントID】
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const cognitoUser = userPool.getCurrentUser(); // 現在のユーザー

var currentUserData = {}; // ユーザーの属性情報

/**
 * 画面読み込み時の処理
 */
$(document).ready(function () {
  // Amazon Cognito 認証情報プロバイダーの初期化
  AWSCognito.config.region = "ap-northeast-1"; // リージョン
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-1:cfb301f8-4393-4e74-8ff1-5491f36dce0d", // 【Identity pool ID　IDプールのID】
  });

  // 現在のユーザーの属性情報を取得・表示
  getUserAttribute();
});

/**
 * 現在のユーザーの属性情報を取得・表示する
 */
var getUserAttribute = function () {
  // 現在のユーザー情報が取得できているか？
  if (cognitoUser != null) {
    // cognitoUser.getSession(function (err, session) {
    //   if (err) {
    //     console.log(err);
    //     $(location).attr("href", "signin.html");
    //   } else {
    //     // ユーザの属性を取得
    //     cognitoUser.getUserAttributes(function (err, result) {
    //       if (err) {
    //         $(location).attr("href", "signin.html");
    //       }

    //       // 取得した属性情報を連想配列に格納
    //       for (i = 0; i < result.length; i++) {
    //         currentUserData[result[i].getName()] = result[i].getValue();
    //       }
    //       $("div#menu h1").text(
    //         "ようこそ！" + currentUserData["family_name"] + "さん"
    //       );
    //     });
    //   }
    // });
    cognitoUser.getSession(function (e, session) {
      $.ajax({
        contentType: "application/json",
        headers: {
          Authorization: session.getIdToken().jwtToken,
        },
        dataType: "json",
        type: "GET",
        url: "https://5408xyoom0.execute-api.ap-northeast-1.amazonaws.com/testCognito/testcognito",
        success: function (data) {
          $("div#menu h1").text(data);
        },
        error: function (data) {
          console.log("error", data);
        },
      });
    });
  } else {
    $(location).attr("href", "signin.html");
  }
};
