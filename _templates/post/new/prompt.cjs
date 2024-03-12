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
        const datestamp = `${yr}-${mo}-${d}@${hr}${min}`;

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
                filename: `${datestamp}.${slug}.mdx`,
                yr,
                mo,
                d,
                hr,
                min
            }));
    }
};
