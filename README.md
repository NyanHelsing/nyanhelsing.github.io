# nyanhelsing.github.io

This is the repository for my personal website. It is a react app built using vite and hosted on github pages.

[nyanhelsing.github.io](https://nyanhelsing.github.io)

## Development

### Installing dependencies

To install the dependencies, run the following command:

```bash
pnpm install
```

### Running the development server

To start the development server, run the following command:

```bash
pnpm run dev
```

This will start the vite development server and the websocket server needed for point.lol pointing tool

## Deployment

To deploy the website, run the following command:

```bash
pnpm run pages
```
The deploy branch is the branch that is used to host the website. It is mounted as a submodule in the root of the repository at `dist`. The `pnpm run pages` command builds the static site into dist. The script then prompts for the type of package bump (major, minor, patch), updates the package.json and then pushes the changes to the deploy branch and then pushes the changes to the main branch, with the version bump in the commit message. Once the changes are pushed to the main branch, the github action for the deploy branch is triggered and the changes are deployed to the website. Overall, the deployment process takes about a minute.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
