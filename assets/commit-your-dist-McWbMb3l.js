import{r as p}from"./entry-vqOOkPXu.js";var d={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=p,m=Symbol.for("react.element"),y=Symbol.for("react.fragment"),f=Object.prototype.hasOwnProperty,g=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function h(n,e,a){var t,r={},s=null,l=null;a!==void 0&&(s=""+a),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(l=e.ref);for(t in e)f.call(e,t)&&!x.hasOwnProperty(t)&&(r[t]=e[t]);if(n&&n.defaultProps)for(t in e=n.defaultProps,e)r[t]===void 0&&(r[t]=e[t]);return{$$typeof:m,type:n,key:s,ref:l,props:r,_owner:g.current}}i.Fragment=y;i.jsx=h;i.jsxs=h;d.exports=i;var o=d.exports;function c(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{children:"Streamlining Deployment with Git Submodules and a Handy Script"}),`
`,o.jsx(e.h2,{children:"Elevate Your Deployment Workflow"}),`
`,o.jsx(e.p,{children:"In the realm of web development, streamlining your deployment process can save you invaluable time and avoid unnecessary headaches. Today, I'd like to share a clever approach that leverages the power of Git submodules, combined with a simple, yet effective script, to supercharge your deployment workflow, especially when working with static site generators and platforms like GitHub Pages."}),`
`,o.jsx(e.h2,{children:"The Magic of Submodules"}),`
`,o.jsx(e.p,{children:"Git submodules allow you to include and manage a Git repository as a subdirectory within another Git repository. This feature is perfect for when you need to incorporate external libraries, plugins, or, in our case, a specific deployment setup."}),`
`,o.jsx(e.h3,{children:"A Practical Scenario: Deploy Branch as a Submodule"}),`
`,o.jsxs(e.p,{children:["Imagine you have a project where your main work happens on the ",o.jsx(e.code,{children:"main"})," branch, but deployments are managed through a separate branch, typically called ",o.jsx(e.code,{children:"deploy"}),". Switching between branches for deployment tasks can be tedious and prone to errors. Here’s where a submodule can come into play beautifully."]}),`
`,o.jsxs(e.p,{children:["By adding a submodule to your main repository that points to the ",o.jsx(e.code,{children:"deploy"})," branch, you streamline the process. This setup allows you to manage deployment-ready files directly from your main workspace without the need to switch contexts."]}),`
`,o.jsx(e.h2,{children:"The Script that Ties It All Together"}),`
`,o.jsx(e.p,{children:"To make this process even more efficient, we introduce a simple script that automates the building and deployment steps. Here's what it looks like:"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-json",children:`"scripts": {
    "deploy": "pnpm build && cd dist && git add . && git commit -m 'doing a deploy' && git push"
}
`})}),`
`,o.jsxs(e.p,{children:["Adding this script to your ",o.jsx(e.code,{children:"package.json"})," enables you to execute a series of commands with a single command: building your project, committing the changes in the ",o.jsx(e.code,{children:"dist"})," directory (which is our submodule pointing to the ",o.jsx(e.code,{children:"deploy"})," branch), and pushing them to the repository. It’s a seamless way to deploy your site to GitHub Pages or any similar hosting service."]}),`
`,o.jsx(e.h2,{children:"Why This Approach?"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:[o.jsx(e.strong,{children:"No More Branch Switching"}),": Deploy directly from your main branch without ever needing to switch to the deploy branch manually."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.strong,{children:"Direct File Management"}),": Easily add or update files in your deployment directory from your main branch, bypassing the build tool when necessary."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.strong,{children:"Efficiency"}),": Save time and reduce the complexity of your deployment process with a one-liner command."]}),`
`]}),`
`,o.jsx(e.h2,{children:"Wrapping Up"}),`
`,o.jsx(e.p,{children:"Leveraging Git submodules in combination with a custom script can significantly simplify your deployment process. This method is not only efficient but also adaptable to various project setups, making it a valuable addition to your development toolkit."}),`
`,o.jsx(e.p,{children:"Give it a try, and see how it transforms your deployment workflow. Happy coding!"})]})}function b(n={}){const{wrapper:e}=n.components||{};return e?o.jsx(e,{...n,children:o.jsx(c,{...n})}):c(n)}export{b as default};
