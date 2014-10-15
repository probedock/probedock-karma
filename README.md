# Karma reporter for ROX Center Clients

> Karma reporter to send test results to [ROX Center](https://github.com/lotaris/rox-center).

## Usage

Add it as a development dependency:

```bash
npm install --save-dev rox-client-karma
```

And to your Karma configuration:

```js
module.exports = function(config){
  config.set({

    files: ['*.test.js'],
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome', 'Firefox'],

	// add the reporter
    reporters: ['rox'],

	// customize the configuration
    rox: {
      config: {
        project: {
          category: 'Karma (Jasmine)'
        }
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'rox-client-karma' // register the plugin
    ]
  });
};
```

## Contributing

* [Fork](https://help.github.com/articles/fork-a-repo)
* Create a topic branch - `git checkout -b feature`
* Push to your branch - `git push origin feature`
* Create a [pull request](http://help.github.com/pull-requests/) from your branch

Please add a changelog entry with your name for new features and bug fixes.

## License

*rox-client-karma* is licensed under the [MIT License](http://opensource.org/licenses/MIT).
See [LICENSE.txt](LICENSE.txt) for the full text.
