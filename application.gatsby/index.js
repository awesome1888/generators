const path = require('path');

module.exports.Generator = class Generator {
    getName() {
        // this is the name your generator will appear in the list under
        return 'Gatsby React application';
    }

    async getQuestions() {
        // see inquirer docs to get more information on the format of questions
        // https://www.npmjs.com/package/inquirer#questions
        return [
            {
                message: 'What will be the project code?',
                name: 'project_code',
            },
            {
                message: 'What will be the website domain?',
                name: 'project_domain',
            },
            {
                message: 'Are we using path prefix (like for GitHub pages)?',
                name: 'path_prefix',
            },
            {
                message: 'Project name',
                name: 'project_name',
                default: 'New project',
            },
            {
                message: 'Project short name',
                name: 'project_pwa_short_name',
                default: (answers) => {
                    return answers.project_name;
                },
            },
            {
                message: 'Project description',
                name: 'project_description',
                default: (answers) => {
                    return answers.project_name;
                },
            },
            {
                message: 'GitHub account name',
                name: 'github_account_name',
            },
            {
                message: 'GitHub repository name',
                name: 'github_repository_name',
            },
            {
                message: 'Author name',
                name: 'author_name',
            },
            {
                message: 'Author email',
                name: 'author_email',
            },
            {
                message: 'Google Analytics ID',
                name: 'ga_id',
            },
            {
                message: 'Bootstrap blog?',
                name: 'use_blog',
                type: 'confirm',
                default: false,
            },
            {
                message: 'Enable MaterialUI?',
                name: 'use_mui',
                type: 'confirm',
                default: false,
            },
            {
                message: 'Enable offline support? (not recommended for frequently changing website)',
                name: 'use_offline',
                type: 'confirm',
                default: false,
            },
        ];
    }

    async refineAnswers(answers) {
        // here it is possible to alter some answers before the generation starts
        answers.project_code_kebab = this.util.textConverter.toKebab(
            answers.project_code,
        );
        answers.no_blog = !answers.use_blog;

        const emailParts = answers.author_email.split('@');
        answers.author_email_start = emailParts[0];
        answers.author_email_end = emailParts[1];

        answers.path_prefix = answers.path_prefix ? answers.path_prefix.replace(/^\//, '') : '';

        return answers;
    }

    async getDependencies(answers) {
        // list your dependencies here
        const { use_blog, ga_id, use_mui } = answers;

        return {
            destination: '[project_code_kebab]/',
            packages: [
                '@gannochenko/etc',
                '@gannochenko/ui',
                '@mdx-js/mdx',
                '@mdx-js/react',
                'animated-scroll-to',
                'babel-plugin-styled-components',
                'color',
                !!ga_id && 'copy-to-clipboard',
                'debounce',
                'events',
                'gatsby',
                'gatsby-image',
                'gatsby-plugin-catch-links',
                !!ga_id && 'gatsby-plugin-google-analytics',
                'gatsby-plugin-manifest',
                'gatsby-plugin-mdx',
                'gatsby-plugin-netlify-cms',
                'gatsby-plugin-offline',
                'gatsby-plugin-react-helmet',
                'gatsby-plugin-sharp',
                'gatsby-plugin-sitemap',
                'gatsby-plugin-styled-components',
                'gatsby-remark-images',
                'gatsby-remark-relative-images',
                'gatsby-source-filesystem',
                'gatsby-transformer-remark',
                'gatsby-transformer-sharp',
                'markdown-it',
                'netlify-cms-app',
                !!use_blog && 'prism-react-renderer',
                !!use_blog && 'copy-to-clipboard',
                'react',
                'react-dom',
                'react-helmet',
                'react-router',
                'sharp',
                'styled-components@4',
                'throttle-debounce',
                'write',
                !!use_mui && '@material-ui/core',
                !!use_mui && 'gatsby-plugin-material-ui',
            ],
        };
    }

    async getDevDependencies(answers) {
        // list your dev dependencies here
        const { use_blog, use_mui } = answers;

        return {
            destination: '[project_code_kebab]/',
            packages: [
                '@babel/core',
                '@types/color',
                '@types/debounce',
                '@types/events',
                '@types/markdown-it',
                '@types/mdx-js__react',
                '@types/react-helmet',
                '@types/styled-components@4',
                '@types/throttle-debounce',
                !!use_mui && '@types/material-ui',
                '@typescript-eslint/eslint-plugin',
                '@typescript-eslint/parser',
                'eslint',
                'eslint-config-airbnb-base',
                'eslint-config-prettier',
                'eslint-plugin-import',
                'eslint-plugin-jsx-a11y',
                'eslint-plugin-prettier',
                'eslint-plugin-react',
                'eslint-plugin-react-hooks',
                'gatsby-plugin-typescript',
                'gh-pages',
                'husky',
                'prettier',
                'pretty-quick',
                'typescript',
                'typescript-styled-plugin',
            ],
        };
    }

    async onAfterExecution() {
        await this.runLinter();
    }

    async runLinter() {
        const { execa, pathExists } = this.util;

        const applicationFolder = path.join(this.context.destinationPath, this.answers.project_code_kebab);
        if (await pathExists(applicationFolder)) {
            await execa('yarn', ['run', 'lint:fix'], {
                cwd: applicationFolder,
                stdio: ['inherit', 'inherit', 'inherit'],
            });
        }
    }
};
