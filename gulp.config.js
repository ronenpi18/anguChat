module.exports = function() {
	var config = {
		allTs: './app/**/*.ts',
		typings: './typings/**/*.d.ts',
		allCss: './app/**/*.css',
		allScss: './app/**/*.scss',
		allJades: './app/**/*.jade',
		bowerComonents: './bower_components/**/*',
		tsOutputPath: './app/'
	};

	return config;
};
