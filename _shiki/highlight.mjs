import { createHighlighter } from 'shiki';

const readStdin = () => {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.on('readable', () => {
            let chunk;
            while (null !== (chunk = process.stdin.read())) {
                data += chunk;
            }
        });
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
};

const theme = 'everforest-light'
const highlighter = await createHighlighter({
    themes: [theme],
    langs: ['javascript', 'python', 'bash', 'html', 'css', 'java', 'scala', 'go', 'json', 'rust', 'kotlin'],
});

// The input will be JSON: { "code": "...", "lang": "..." }
const inputJson = await readStdin();
const input = JSON.parse(inputJson);

const html = highlighter.codeToHtml(input.code, {
    lang: input.lang,
    theme: theme
});

// Output the HTML to stdout so Ruby can capture it
console.log(html);
