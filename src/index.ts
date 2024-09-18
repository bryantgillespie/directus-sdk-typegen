#!/usr/bin/env node
import { Command } from 'commander';
import { generateDirectusTypes } from './generate';

function runCLI() {
  const program = new Command();
  program
    .name('directus-sdk-typegen')
    .description('CLI and library to generate TypeScript types from Directus collections for use with Directus SDK.')
    .version('0.1.2')
    .option('-o, --output <path>', 'Output file path including filename', './directus-schema.ts')
    .option('-u, --url <url>', 'Directus API URL', 'http://localhost:8055')
    .option('-t, --token <token>', 'Directus API token', 'your-token-here')
    .action(async (options) => {
      try {
        await generateDirectusTypes({
          outputPath: options.output,
          directusUrl: options.url,
          directusToken: options.token,
        });
        console.log(`Types generated successfully at ${options.output}`);
      } catch (error) {
        console.error('Error generating Directus types:', error);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}

// Run the CLI only if this file is being executed directly
if (require.main === module) {
  runCLI();
}

// Export for use as a module
export { generateDirectusTypes };
