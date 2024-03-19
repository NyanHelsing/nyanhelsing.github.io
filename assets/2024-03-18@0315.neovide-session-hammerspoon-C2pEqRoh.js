import{j as e}from"./jsx-runtime-GSRrt4j_.js";import"./entry-BJXNDvgz.js";const a="Neovide Session Management with Hammerspoon",r="neovide-session-hammerspoon",d="2024-03-18T07:15:29.550Z",c=[],h="Global MacOS keybindings for managaing neovide sessions are possible by using neovim's clien-server architecture.",l="";function i(o){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Neovide Session Management with hammerspoon"}),`
`,e.jsx(n.p,{children:`Neovide is a great neovim client that provides a modern UI and is easy to use.
Working on multiple projects and switching between them is a really common
task for developers. If a developer wanted to work on multiple projects at
the same time, they might think about opening multiple neovide windows, but
this is can be problematic because switching between windows can be cumbersome
and it's easy to lose track of which window is for which project.`}),`
`,e.jsx(n.p,{children:`On MacOS, hammerspoon is a great tool for automating tasks and managing
windows. It can be used to switch between windows and would be a great way to
solve for our use case.`}),`
`,e.jsx(n.p,{children:`Let's solve neovim session management for neovide by creating a setup that can
programmatically change the loaded session, (or anything you could think to do
in neovim really), using the MacGyveresque capabilities of hammerspoon`}),`
`,e.jsx(n.h2,{children:"Why Client-Server?"}),`
`,e.jsxs(n.p,{children:[`Using a client-server architecture solves a few problems: By default, neovide
embeds a neovim process as a child of neovide; effectively theres an isolated,
different neovim instance in `,e.jsx(n.em,{children:"each"})," window."]}),`
`,e.jsxs(n.p,{children:[`In order to have hammerspoon send commands to the neovim process, hammerspon
has to have the ability to do so. When neovim is embedded, the host uses
stdin/out/err to communicate with neovim. That means if we wanted hammerspoon
to talk to neovim , it would need to somehow be `,e.jsx(n.em,{children:"inside"}),` of neovide in order
to do so. In other words; we need to set up neovim to use a server-client
architecture, so hammerspoon `,e.jsx(n.em,{children:"has"}),` a way to send commands to the neovim server
to manage the sessions.`]}),`
`,e.jsx(n.p,{children:`If we had multiple neovim instances running, we need to know which one to send
the commands to. since there would be multiple neovim instances running, this
would be complicated.`}),`
`,e.jsx(n.p,{children:`Finally, if there were multiple neovim instances running, they would all be
competing for access to the same files. This would be a problem if we wanted
to open the same file in multiple windows, or if we wanted to open a file in
a window that was already open in another window.`}),`
`,e.jsx(n.p,{children:`This is where the server-client architecture comes in. We can run a single
neovim server and connect to it with multiple clients so neovim doesnt have
conflicts with open files. Neovide can be configured to connect to a server,
and then we can use Hammerspoon to manage the sessions by sending commands to
the server.`}),`
`,e.jsx(n.h2,{children:"Connect Neovide to the Server"}),`
`,e.jsxs(n.p,{children:[`In order to connect neovide to a neovim server, neovide needs to be
started with the `,e.jsx(n.code,{children:"--server"}),` option. If neovide isn't already open, it can
be launched from the command line with this option like this (assuming the
same path to the socket as demonstrated in the plist above)`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`neovide --server /tmp/nvimsocket
`})}),`
`,e.jsxs(n.p,{children:["One problem, is there needs to actually ",e.jsx(n.em,{children:"be"}),` a neovim server running for
Neovide to connect to! Neovide doesn't automatically start a neovim serve when
it launches; it creates a child process using `,e.jsx(n.code,{children:"nvim --embed -p"}),`. We can see
this if we `,e.jsx(n.code,{children:"grep"})," for running processes; we might see something like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`$ ps aux | grep nvim
nyanhelsing   24500   0.0  0.1 422010655  18000 s003  S   11:00AM   0:00.00 /opt/homebrew/bin/nvim --embed -p
`})}),`
`,e.jsx(n.p,{children:`In order to send commands to a neovim server, we'll need to start nvim a
different way.`}),`
`,e.jsx(n.h2,{children:"Run A Neovim server"}),`
`,e.jsx(n.p,{children:`Neovim has support for running in a headless mode and for listening on a port
or socket, out of the box. This can be tested out from a regular terminal
window (probably don't do this from within neovim or neovide, as it would make
it difficult to test if it's working.)`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`nvim --headless --listen /tmp/nvimsocket
`})}),`
`,e.jsx(n.h3,{children:"Launch Neovim Server on Login"}),`
`,e.jsx(n.p,{children:`For this setup , we'll want daemonized server for neovim, then every time you
start neovide, it will connect to this server, and the neovim server doesn't
have to be started separately every single time.`}),`
`,e.jsxs(n.p,{children:[`On MacOS, we can acheive this by adding our neovim server to launch agents to
start the server on login. This plist would need to be placed in the correct
directory (`,e.jsx(n.code,{children:"~/Library/LaunchAgents/"}),") and loaded with the ",e.jsx(n.code,{children:"launchctl"}),` command.
You would use `,e.jsx(n.code,{children:"launchctl load <path-to-plist>.plist"}),` to load it if you put it
in a different directory.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vim",children:`:e ~/Library/LaunchAgents/io.nyanhelsing.neovim-server.plist
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-plist",children:`<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>io.nyanhelsing.neovim-server</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/nvim</string>
    <string>--headless</string>
    <string>--listen</string>
    <string>/tmp/nvimsocket</string>
  </array>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
`})}),`
`,e.jsx(n.h2,{children:"Make Launching Seamless"}),`
`,e.jsxs(n.p,{children:["Note that if neovide is launched by double-clicking on the ",e.jsx(n.code,{children:".app"}),` icon or if it's
launched from Sherlock (The macos search utility), this argument won't be passed
to the executable.`]}),`
`,e.jsxs(n.p,{children:[`A way around this is to use hammerspoon to launch neovide from a keybinding, since
then we'll have control over how the application is lauched.
Hammerspoon is available on `,e.jsx(n.a,{href:"%22https://hammerspoon.org%22",children:"the Hammerspoon website"}),`.
It's easy to install, as an `,e.jsx(n.code,{children:".app"}),` bundle that is downloaded and dragged to then
applications directory.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-lua",children:`hs.hotkey.bind({"ctrl", "shift"}, ";", function()
end, function()
    os.execute("open -a /Applications/Neovide.app --args --server /tmp/nvimsocket")
    os.execute("sleep 0.1")
    hs.application.find("neovide"):activate()
    os.execute("nvim --server --remote-send '<C-\\\\><C-N>:'")
end, function()
end)
`})}),`
`,e.jsx(n.p,{children:`With a keybinding like this, hammerspoon can launch Neovide from anywhere;
whether the current active process is a browser or a terminal; Neovide itself
doesn't even need to be open since it'll be automatically launched.`}),`
`,e.jsx(n.p,{children:`The only requirement here is that Hammerspoon is running; which has it's own
plist file (Like the one above, but that one is installed automatically with
Hammerspoon).`}),`
`,e.jsx(n.h3,{children:"Consider Advocating for Out of the Box support"}),`
`,e.jsx(n.p,{children:`A feature that could make this setup much simpler would be first party support
from neovide, through the neovide config.toml, to both automatically launch
with a connection to a nv server as specified, or to automatically launch a
nvim server. Tboth of these options would suppot more common methods of launch
Neovide, such ase when auser launches neovide from the application icon in the
finder or searches for neovide. It would also benefit users that might forgets
to pass the argument and not realize until many changes have been made in an
isolated instance of Neovide, would be to enable this as a setting in the neovide
configuration.`}),`
`,e.jsx(n.p,{children:`Neovide already supports launchin with the server argument at the commandline;
when the config toml file supports the server argument, then configuring this
in the toml file might be something like:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-toml",children:`server="/tmp/nvimsocket"
`})}),`
`,e.jsx(n.p,{children:`The other option that neovide could do is actually launch the neovim instance
in a separate process group out of the box and disowning it. That would enable
neovide config to manage the whoule setup (except the global keybinding) right
out of the box, and from a single file. It might look somethin like this:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-toml",children:`server="/tmp/nvimsocket"
auto_server=true
`})}),`
`,e.jsxs(n.p,{children:["In that proposal, the ",e.jsx(n.code,{children:"auto_server"}),` option would automatically ensure the nvim
server is running.`]}),`
`,e.jsx(n.h2,{children:"Send Commands to the Neovim Server"}),`
`,e.jsx(n.p,{children:`So far Neovide has been launched with a connection to a running server, and the
neovim server has been configured to automatically launch at login. Now the
running neovim server that is displayed in neovide can be managed with the
following commands.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`nvim --server /tmp/nvimsocket --remote-send '<C-\\><C-n>:PosessionLoad somesession<CR>'
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<C-\\><C-n>"}),` is a command to switch to normal mode, which is neccesary if
neovim is in `,e.jsx(n.code,{children:"insert"})," mode or ",e.jsx(n.code,{children:"terminal"}),` mode when the command is sent. The
`,e.jsx(n.code,{children:":PosessionLoad somesession"})," is a command to load a session named ",e.jsx(n.code,{children:"somesession"}),"."]}),`
`,e.jsx(n.h2,{children:"Configure Hammerspoon to Manage Neovim Sessions"}),`
`,e.jsx(n.p,{children:`Finally, add the following hammerspoon configuration to manage the neovide
sessions.`}),`
`,e.jsxs(n.p,{children:["we'll use ",e.jsx(n.code,{children:"command"}),"+",e.jsx(n.code,{children:":"}),"+",e.jsx(n.code,{children:"1"})," , ",e.jsx(n.code,{children:"command"}),"+",e.jsx(n.code,{children:":"}),"+",e.jsx(n.code,{children:"2"})," , ",e.jsx(n.code,{children:"command"}),"+",e.jsx(n.code,{children:":"}),"+",e.jsx(n.code,{children:"3"}),` , to
switch between three predefined sessions.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-lua",children:`local function neovideSessionLoad(session)
    os.execute("open -a /Applications/Neovide.app --args --server /tmp/nvimsocket")
    os.execute("sleep 0.1")
    hs.application.find("neovide"):activate()
    hs.execute("nvim --server /tmp/nvimsocket --remote-send '<C-\\\\><C-n>:PosessionLoad "..session.."<CR>'")
end 

hs.hotkey.bind({"cmd", "}, "1", function()
    neovideSessionLoad("unnamedsession1")
end)
hs.hotkey.bind({"cmd"}, "2", function()
    neovideSessionLoad("unnamedsession2")
end)
hs.hotkey.bind({"cmd"}, "2", function()
    neovideSessionLoad("unnamedsession2")
end)
`})}),`
`,e.jsx(n.h2,{children:"Next Steps"}),`
`,e.jsx(n.p,{children:`Some other concepts that could be set up might include applescript to open a
native window to select a path, which is then sent to neovim to activate a
session in that working dir or open the existing session in that dir if it
exists; otherwise create one, etc.`})]})}function m(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{d as date,m as default,l as image,r as slug,h as summary,c as tags,a as title};
