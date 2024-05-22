export interface ChatGptMarkdownTranslatorOptions {
  /**
   * Model (`MODEL_NAME`)

     This is the setting that has the greatest impact on translation accuracy (and price!). Set this to one of the [Chat models](https://platform.openai.com/docs/models/) accepted by the OpenAI API.

     ```markdown
     - Recommended:
       - `gpt-4-turbo` (or using shortcut `4`)
       - `gpt-3.5-turbo` (or using shortcut `3`)
     - Legacy / No longer recommended:
       - `gpt-4`
       - `gpt-4-32k` (or using shortcut `4large`)
       - `gpt-3.5-turbo-16k` (or using shortcut `3large`)
     ```

     Shortcuts (in brackets) are available. Starting from v1.7.0, the shortcut `4` points to `gpt-4-turbo` rather than `gpt-4`.

     Although GPT-4 is much smarter, it is slower and much more expensive than GPT-3. Try using the GPT-3 model first, especially while you are experimenting with this tool. It's recommended to set the usage limit to a reasonable amount (e.g., $10) on the OpenAI's account management page.
   */
  model?: "3" | "4" | "gpt-3.5-turbo" | "gpt-4o";
  inputPath: string;
  outputPath: string;
  cwd?: string;
}

async function chatGptMarkdownTranslator(options: ChatGptMarkdownTranslatorOptions) {
  console.log(
    `Starting translation with input file: "${options.inputPath}" and output file: "${options.outputPath}"...`
  );

  const model = options.model ?? "gpt-3.5-turbo";
  console.log(`Translation starting with model: "${model}"...`);
  console.log('Env: ', process.env.OPENAI_API_KEY)
  Bun.spawn(
    ["node_modules/.bin/chatgpt-md-translator", "--model", model, "--out", options.outputPath, options.inputPath],
    {
      cwd: options.cwd,
      env: { ...process.env }, // specify environment variables
      onExit(proc, exitCode, signalCode, error) {
        // exit handler
      },
      stdout: "inherit",
    }
  );
  console.log(`Translation completed`);
}

await chatGptMarkdownTranslator({
  model: "gpt-3.5-turbo",
  inputPath: `./input.md`,
  outputPath: `./output.md`,
  cwd: import.meta.dirname,
});
