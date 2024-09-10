# 微信小程序文件上传webview

由于微信小程序(手机端)文件上传限制在微信聊天文件的获取，通过webview绕过微信的文件获取api从而上传本地的文件。

### 使用方法

1. `config.ts` 修改为自己的url(直接通过param传url容易引起一些麻烦)
2. `api/uploadFile.ts` 中的 `upload` 函数修改为自己的文件上传方法
3. `api/urlParams.ts` 中可以增加自己的传参并在其他文件中import使用

### 开发和部署

1. `pnpm dev:loc` 将调用模拟上传函数以进行动画等行为的开发
2. `pnpm dev` 将进行正常的本地开发