module.exports = {
	baseUrl: './',
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			globDirectory: '.',
			globPatterns: ['dist/*.{js,png,html,css}'],
			swSrc: 'public/service-worker.js',
		}
	}
}