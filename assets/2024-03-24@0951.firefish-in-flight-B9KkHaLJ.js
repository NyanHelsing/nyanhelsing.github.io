import{j as e}from"./jsx-runtime-BgBEaW03.js";import"./entry-D1ZUI9lz.js";const o="Firefish in Flight",r="firefish-in-flight",h="2024-03-24T13:51:02.359Z",l=[],c="Giving firefish its wings might not be totally effortless now, but it could be with a little work.",d="";function n(i){const t={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h1,{children:"Firefish in Flight"}),`
`,e.jsx(t.p,{children:"Nyan Helsing has launched a Fediverse instance!"}),`
`,e.jsx(t.h2,{children:"Introduction"}),`
`,e.jsxs(t.p,{children:["The Fediverse enables one of the most refreshing destinations on the internet; it embodies decentralization and diversity. At its core, the Fediverse is a network of servers, each hosting their own communities and content that can seamlessly connected to one another through shared protocols like ",e.jsx(t.code,{children:"ActivityPub"}),"."]}),`
`,e.jsx(t.p,{children:`Communities within the Fediverse have the freedom to create their own norms, rules, and cultures. This leads to a rich tapestry of subcultures and niche interests that often don't have a space on mainstream platforms. Moreover, the open-source nature of many Fediverse projects encourages a level of transparency and user participation in the development process that's rare in the proprietary platforms dominating the internet.
This variety ensures that the Fediverse is not a monolith but a vibrant, ever-evolving space that welcomes a wide range of interests, languages, and cultures.`}),`
`,e.jsx(t.p,{children:"What's really cool about this is that it not only fosters a rich tapestry of communities but also champions a diversity of server software, each bringing its own flavor and functionality to the digital ecosystem. This decentralization encourages innovation and experimentation with server software. From Mastodon's microblogging platform to PeerTube's video sharing and beyond, each piece of software offers unique features and interfaces, catering to different community needs and preferences."}),`
`,e.jsxs(t.p,{children:["Cementing the Fediverse's cool factor is the underlying principle that ",e.jsx(t.em,{children:"anyone"})," can host a server, further contributing to the network's growth and diversity. Unlike the centralized social networks, where a single entity controls the ~narrative~ data, the Fediverse puts power back into the hands of its users. This software diversity not only enhances user choice and customization but also promotes resilience against censorship and single points of failure, making the Fediverse a bastion for free expression and collaboration across the digital divide."]}),`
`,e.jsx(t.h2,{children:"Picking a server software"}),`
`,e.jsx(t.p,{children:"Choosing Firefish wasn't a random shot in the dark; it was a decision influenced by the architecture's elegant balance and the technology stack's broad appeal."}),`
`,e.jsx(t.p,{children:"Frontend accessibility isn’t just a nice-to-have, nor is it just for users. It’s essential, and it matters for development too. JavaScript has emerged not just as a language but as the foundation of web development, making it a natural choice for creating welcoming entry points. Vue, selected for the frontend, stands as a testament to flexibility and community support, securing its place among the top choices without needing to monopolize the spotlight. Vite further simplifies the developer experience, streamlining what has traditionally been a complex part of development into something more approachable."}),`
`,e.jsx(t.p,{children:"On the backend, the continuity of JavaScript through the use of Koa represents a seamless transition for those acquainted with Express; quite possibly the most well known http application server, marrying familiarity with efficiency. When deeper performance tuning becomes paramount, the integration of Rust introduces a layer of sophistication and capability, allowing Firefish to address complex challenges with elegance and precision without the need for overly complex solutions."}),`
`,e.jsx(t.p,{children:"Beyond the technicalities, the biggest appeal of Firefish is in its user experience. The platform addresses the common void new users face, like an oasis in a desert, offering rich, engaging content timelines from the outset; espescially the reccommended timeline. The design ethos, focusing on simplicity and refinement, ensures that the interface remains inviting and intuitive across devices."}),`
`,e.jsx(t.h2,{children:"Building Infrastructure"}),`
`,e.jsxs(t.p,{children:["The whole point of developing the fediverse was to make it easy for ",e.jsx(t.em,{children:"anyone"})," to participate by launching an instace. That accessibility is what makes the Fediverse cool. Once upon a time, Heroku was the accesible way to deploy an app, but Heroku has since lost that accessibliity by becoming quite cost prohibitive. Today, platforms like fly.io follow in heorkus foosteps by creating a freindly and easy to use interface to deploy vms all over the world."]}),`
`,e.jsxs(t.p,{children:["Not only are those vms easy to deply, they also deploy ",e.jsx(t.em,{children:"quickly"})," which is also a key contibuting factor to fly's accesibility. The infrastructure is based on amazon's firecracker vms which are small and lightweight vms so they launch quickly, but are also described by a dockerfile, which meanse that it's really easy to define what the image should look like."]}),`
`,e.jsx(t.h2,{children:"Configuring Firefish"}),`
`,e.jsx(t.p,{children:"Just because ideals have been identified doesn't neccesarily mean reality reflects them (yet). The first issue encountered was that firefish in it's current state passes all its configuration through a config file. On traditional server instance, this is fine; even when using docker, because that config can be mounted in a volume and attached to the firefish container. Without docker it's even easier because the config is just on the disk already."}),`
`,e.jsx(t.p,{children:"On a plaform like fly.io provides, the procedure for deploying an app is a little different. Fly wants to build an image based on the Dockerfile in the repo, and then launch that image in a firecracker vm; and this vm is ephemeral. Even if a disk was mounted to the vm, each vm would need it's own disk maounted since sharing a volume between vms isn't supported."}),`
`,e.jsx(t.p,{children:"A simpler solution is to bake the config into the image, and then this complexity with config is avoided since it'll be there from the point where the image is created. this solves one problem but actually opens another, since the config is the mechanism through which the database credentials for postgres and redis are provided."}),`
`,e.jsx(t.h2,{children:"Secrets Management via Env"}),`
`,e.jsx(t.p,{children:"By putting the database urls into a secrets manager, it's possible to avoid bking the credentials into the image. Fly.io has a secrets manager tool that can be used to manage the secrets the app uses."}),`
`,e.jsx(t.p,{children:"The firefish application does expect the database credentials to be in config, however, so this is where firefish gets forked so the construction of the database clients can be tweked to check if the config is in an environment variable and prioritize this as the source for credentials, and fall back to the config if the environment variables dont specify the credential."}),`
`,e.jsx(t.h2,{children:"Getting PGroonga into Fly Postgres"}),`
`,e.jsx(t.p,{children:"Fly.io provides a postgres feature built right into the cli tool. This functionality is really handy when deploying an app that needs a database since it can launch a HA Postgres cluster with literally no fuss."}),`
`,e.jsx(t.p,{children:"Except if the default plsin postgres instance doesn't mee the needs of the application."}),`
`,e.jsx(t.p,{children:"Firefish uses PGroonga to enable better full text search support across more languages, and this is not installed in the default postgres app that fly provides. Fly does provide the Repository that contians the config however, and it's actually encouraged to fork this to tweak it as needed."}),`
`,e.jsxs(t.p,{children:["Forking the fly.io HA-Postgres repo and tweaking the Dockerfileto be built on the official Pgroonga image enables the deployment of a postgres cluster that has this search extension installed. Note that becuase this isn't the version of postgres built into the fly cli, it's not possible to use the cli tools to manage the postgres cluster now, but deploying is still fairly simple. We do need to ",e.jsx(t.code,{children:"fly scale 0"})," to take down the currently running cluster while we ",e.jsx(t.code,{children:"fly consul attach"}),", then when we ",e.jsx(t.code,{children:"fly scale count 1"}),", our postgres cluster can now talk to consul."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Consul is a control plane that coordinates things like service discovery and enables connectivity from the other vms like the firefish container, and ensures the correct number of postgres replicas are running, etc. Consul serves as the source of truth for coordinating this."}),`
`]}),`
`,e.jsx(t.h2,{children:"Setting up Redis"}),`
`,e.jsx(t.p,{children:"After all that effort setting up postgres, taking the easy road with redis is a well deserved relief; For this example using the official Redis Saas offering gets a redis database set up with little effort."}),`
`,e.jsx(t.p,{children:"Setting up a redis cluster on fly.io directly is a little complicated since the repository that Fly provides has a minimum of 5 nodes and this is a little overkill for the Firefish use case; however the official redis offering has a variety of scaled offerings and enables provisioning on AWS, Azure, and GCP."}),`
`,e.jsxs(t.p,{children:["With a redis cluster deployed and a credential in hand, adding the ",e.jsx(t.code,{children:"REDIS_URL"})," to the fly secrets manager is the last step for getting this Firefish in the air."]}),`
`,e.jsx(t.p,{children:"Later in the future it might be worth revisiting this because there are redis compatible alternatives such as dragonfly, and perhaps it's possible to reconsider a single redis instance on a Fly machine as opposed to"}),`
`,e.jsx(t.h2,{children:"DNS"}),`
`,e.jsxs(t.p,{children:["With the application now up and running, this Firefish deployment is almost useable, but the instance can only currently be accessed from the internal ",e.jsx(t.code,{children:"fly.dev"})," url that fly provides, which is fine for checking that everything is all working, but since the goal is to share the firefish instance with others, DNS needs to be set up in order to share the permanant domain name with everyone."]}),`
`,e.jsx(t.p,{children:"Adding the domain to be used to cloudflare as a site and then cofiguring A and AAAA names to point at the fly machines' shared IPs gets the routing into place, but certificates also need to be generated for the firefish service. Fly.io has a feature to automatically generate this, so after updating the DNS records one more time, the certificates make sure that traffic to firefish supports the domain name."}),`
`,e.jsx(t.p,{children:"The last thing to do is disable the Proxying feature that Cloudflare provides by default using just dns to point the domain to the firefish instance."}),`
`,e.jsx(t.h2,{children:"First Login"}),`
`,e.jsx(t.p,{children:"Now the instance has accessibility from the internet, creating the first account, an admin account, can happen."}),`
`,e.jsx(t.p,{children:"After creating this account, Firefish gives a guided tour and shows how to use the instance (This is a really slick intro and makes onboarding super informative)."}),`
`,e.jsx(t.h2,{children:"SMTP Relay"}),`
`,e.jsx(t.p,{children:"Firefish needs to send emails to users sometimes. While it's possible to send email directly from a machine, there are problems with deliverability  when this is done. Most email services block emails from being delivered if the email doesn't originate from a reputable mail transporter. SMTP relays provide this reputation as a service by simplifying the addition of DNS records that signal that emails actually are originating from the correct service."}),`
`,e.jsx(t.p,{children:"For the firefish instance that's being set up here, mailjet was used largely because mailgun and sendgrid were having bugs in their UI and so mailjet :D"}),`
`,e.jsx(t.p,{children:"After setting up the domain and senders in MailJet, the credentials are added to Firefish through the admin panel ."}),`
`,e.jsx(t.h2,{children:"File Storage"}),`
`,e.jsx(t.p,{children:"Finally, object storage is getting set up. When users upload images in their posts, or set a profile picture, the file needs to be uploaded and stored somewhere so that it can be served to pther users. This time arouns, the Cloudflare R2 storage service was used, as CloudFlare is already being used for DNS. R2 provides a S3-compatible API which Firefish can use to upload files from each user, and then a public url (configured as base url in the firefish admin panel) can also be set up; this enables public read only access to files in the storage bucket."}),`
`,e.jsx(t.h2,{children:"Conclusion"}),`
`,e.jsxs(t.p,{children:["This was not an isignificant amount of work to make firefish happen on fly.io and there are difinitely still improvements that can be made to enable better scaling and lower resource utilization, but this effort clears the path to show a way that deploying firefish can be made ",e.jsx(t.em,{children:"really accessible"}),". To the point where it may even be possible to run most of this in CI."]}),`
`,e.jsxs(t.p,{children:["If that's the case, then anyone that wants to run a firefish instance could be in a position where ",e.jsx(t.em,{children:"all"})," they'd need to do is fork the repo, and then set required access tokens, api tokens, or passwords, and... thats it -- ",e.jsx(t.em,{children:"a shiny new Firefish instance"}),"."]})]})}function f(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{h as date,f as default,d as image,r as slug,c as summary,l as tags,o as title};