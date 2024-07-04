# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
2NY-Frontend
├─ .git
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-285127670a6a570becd485adad692aab93f1b46d.idx
│  │     ├─ pack-285127670a6a570becd485adad692aab93f1b46d.pack
│  │     ├─ pack-285127670a6a570becd485adad692aab93f1b46d.rev
│  │     ├─ pack-6936b64bab690582426128baa3021948187f5b86.idx
│  │     ├─ pack-6936b64bab690582426128baa3021948187f5b86.pack
│  │     └─ pack-6936b64bab690582426128baa3021948187f5b86.rev
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .github
│  ├─ ISSUE_TEMPLATE
│  │  ├─ bug_report.md
│  │  ├─ etc.md
│  │  └─ feature_request.md
│  ├─ PULL_REQUEST_TEMPLATE
│  │  └─ PULL_REQUEST_TEMPLATE.md
│  └─ PULL_REQUEST_TEMPLATE.md
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  ├─ figma.png
│  │  ├─ google.png
│  │  ├─ jira.png
│  │  ├─ kakao.png
│  │  └─ naver.png
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ README.old.md
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ AppRouter.js
   ├─ cart
   │  ├─ api
   │  │  └─ user.js
   │  ├─ components
   │  │  └─ Auth.js
   │  ├─ hooks
   │  │  └─ useUser.js
   │  ├─ models
   │  │  └─ UserModel.js
   │  ├─ viewModels
   │  │  └─ UserViewModel.js
   │  └─ views
   │     └─ User.JS
   ├─ component
   │  ├─ BlueButton.js
   │  ├─ css
   │  │  └─ rainbow.css
   │  ├─ Footer.js
   │  ├─ Header.js
   │  └─ WhiteButton.js
   ├─ config
   │  └─ app-config.js
   ├─ index.css
   ├─ index.js
   ├─ items
   │  ├─ api
   │  │  └─ user.js
   │  ├─ components
   │  │  └─ Auth.js
   │  ├─ hooks
   │  │  └─ useUser.js
   │  ├─ models
   │  │  └─ UserModel.js
   │  ├─ viewModels
   │  │  └─ UserViewModel.js
   │  └─ views
   │     └─ User.JS
   ├─ logo.svg
   ├─ orders
   │  ├─ api
   │  │  └─ user.js
   │  ├─ components
   │  │  └─ Auth.js
   │  ├─ hooks
   │  │  └─ useUser.js
   │  ├─ models
   │  │  └─ UserModel.js
   │  ├─ viewModels
   │  │  └─ UserViewModel.js
   │  └─ views
   │     └─ User.JS
   ├─ reportWebVitals.js
   ├─ review
   │  ├─ api
   │  │  └─ user.js
   │  ├─ components
   │  │  └─ Auth.js
   │  ├─ hooks
   │  │  └─ useUser.js
   │  ├─ models
   │  │  └─ UserModel.js
   │  ├─ viewModels
   │  │  └─ UserViewModel.js
   │  └─ views
   │     └─ User.JS
   ├─ setupTests.js
   └─ users
      ├─ api
      │  ├─ userApi.js
      │  └─ userLoginApi.js
      ├─ components
      │  ├─ common
      │  │  └─ Input.js
      │  └─ css
      │     └─ users.css
      ├─ hooks
      │  └─ useForm.js
      ├─ models
      │  └─ User.js
      ├─ viewModels
      │  ├─ useLoginViewModel.js
      │  └─ useSignUpViewModel.js
      └─ views
         ├─ LoginView.js
         └─ SignUpView.js

```