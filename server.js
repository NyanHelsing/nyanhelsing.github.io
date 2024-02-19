Deno.serve(({
    url
}) => {
    const path = new URL(url, import.meta.url).pathname;

    if (path === "/intake") {
         
        
    }

    return new Response(`Hello, path is ${path}`);
});
