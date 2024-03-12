import{j as e}from"./jsx-runtime-CrZ1Y-mD.js";import"./entry-LvGXM60r.js";const r="posts-organization",a="Organizing Blog Posts",l="2024-03-09",h="2024-03-09T06:10:05.903Z",d="organized-library.png",c="Organizing a blog's directory with a clear system isn't just about keeping things tidy. It's about making life easier; whether hunting for a specific post or scheduling future content. Here's why a straightforward naming convention really helps:";function s(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Organizing Blog Posts"}),`
`,e.jsx(n.p,{children:"Organizing a blog's directory with a clear system isn't just about keeping things tidy. It's about making life easier; whether hunting for a specific post or scheduling future content. Here's why a straightforward naming convention really helps:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Easy to Find Stuff"}),`: Ever tried to find an old photo on your phone when they're all named "IMG_1234"? It's a pain. Imagine your blog posts are named with clear dates and titles. Suddenly, finding that specific post from 5 years ago is a breeze.`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"No Guessing the Date"}),": By looking at the filename, it's obvious exactly when it was created. Handy, right? Especially when trying to remember if that post about cat training was written before or after Auntie's birthday."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Sorts Itself Out"}),": Computers love order. With names like ",e.jsx(n.code,{children:"2024.04.20@1700-my-cat-post"}),", files line up perfectly from oldest to newest without lifting a finger. It's like magic, but it's actually just smart naming."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Looks Clean"}),": Opening a folder to see a neatly organized list of files feels good. It's like that just-finished-perfectly-organizing-the-bookshelf feeling. Everything in its place."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"No Weird Characters"}),": Ever tried to email a file and it just wouldn't because the name had weird symbols? Using simple, web-friendly characters in the post's filenames means less hassle sharing or uploading them."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Future You Will Thank You"}),": A year down the line, looking back through a trove of posts, everything will be exactly where it's expected to be - No time travel needed, just a smart naming system."]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"In short, a good naming convention saves time, reduces stress, and just makes finding and organizing content way easier. It's one of those small efforts that pay off big time in the long run. Plus, it looks neat, and who doesn't love that?"}),`
`,e.jsx(n.h2,{children:"Using a templating tool to generate posts"}),`
`,e.jsx(n.p,{children:"A templating tool enables consiten and reproducible result when creating posts (or any other kind of file really)."}),`
`,e.jsxs(n.p,{children:["A simple template using ",e.jsx(n.a,{href:"https://www.npmjs.com/package/hygen",children:"hygen"})," could look like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`---
to: blog/posts/<%= filename %>
---
---
title: <%= title %>
slug: <%= slug %>
date: <%= isoDate %>
---
# <%= title %>

Your post content here...
`})}),`
`,e.jsx(n.p,{children:"It can be set up with a prompt.cjs that can prepopulate the values or they can be provided at the cli when executing the template."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`
module.exports = {
    prompt: ({ prompter }) => {
        // get the current datetime
        // make sure to leftpad.
        // use 24 hour time.
        const date = new Date();
        const yr = date.getFullYear();
        const mo = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        const hr = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const datestamp = \`\${yr}-\${mo}-\${d}@\${hr}\${min}\`;

        return prompter
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is your the title of the post?"
                },
                {
                    type: "input",
                    name: "slug",
                    message: "What is the post's slug?"
                }
            ])
            .then(({ title, slug }) => ({
                title,
                slug,
                date,
                isoDate: date.toISOString(),
                datestamp,
                filename: \`\${datestamp}.\${slug}.mdx\`,
                yr,
                mo,
                d,
                hr,
                min
            }));
    }
};
`})})]})}function g(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{d as cover,l as date,g as default,h as isoDate,r as slug,c as summary,a as title};
