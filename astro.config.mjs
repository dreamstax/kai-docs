import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://kai-docs.dreamstax.io',
	integrations: [
		starlight({
			title: 'Kai',
			social: {
				github: 'https://github.com/dreamstax/kai',
                discord: 'https://discord.gg/THywZNSMFe',
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Features',
					autogenerate: { directory: 'features' },
				},
			],
           head: [
               {
                   tag: 'script',
                   attrs: {
                       src: 'https://plausible.io/js/script.js',
                       'data-domain': 'kai-docs.dreamstax.io',
                       defer: true,
                   }
               }
           ],
		}),
	],
});
