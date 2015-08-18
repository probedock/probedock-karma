# Karma probe for Probe Dock

> [Karma](http://karma-runner.github.io/) reporter to publish test results to [Probe Dock](https://github.com/probedock/probedock).

[![NPM version](https://badge.fury.io/js/probedock-karma.svg)](http://badge.fury.io/js/probedock-karma)
[![Dependency Status](https://gemnasium.com/probedock/probedock-karma.svg)](https://gemnasium.com/probedock/probedock-karma)
[![License](https://img.shields.io/github/license/probedock/probedock-karma.svg)](LICENSE.txt)



## Usage

Add it as a development dependency:

```bash
npm install --save-dev probedock-karma
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
    reporters: ['probedock'],

    // customize the configuration
    probedock: {
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
      'probedock-karma' // register the plugin
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

*probedock-karma* is licensed under the [MIT License](http://opensource.org/licenses/MIT).
