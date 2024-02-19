Deno.serve(({
    url
}) => {
    const path = new URL(url, import.meta.url).pathname;
    new Response(`Hello, path is ${path}`);
});
