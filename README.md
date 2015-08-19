# Karma Probe for Probe Dock

> [Karma](http://karma-runner.github.io/) reporter to publish test results to [Probe Dock](https://github.com/probedock/probedock).

[![NPM version](https://badge.fury.io/js/probedock-karma.svg)](http://badge.fury.io/js/probedock-karma)
[![Dependency Status](https://gemnasium.com/probedock/probedock-karma.svg)](https://gemnasium.com/probedock/probedock-karma)
[![License](https://img.shields.io/github/license/probedock/probedock-karma.svg)](LICENSE.txt)

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)



<a name="requirements"></a>
## Requirements

* Node.js 0.10+
* Karma 0.12.\*



<a name="installation"></a>
## Installation

Install it as a development dependency:

```bash
npm install --save-dev probedock-karma
```

If you haven't done so already, set up your Probe Dock configuration file(s).
This procedure is described here:

* [Probe Setup Procedure](https://github.com/probedock/probedock-probes#setup)

Then add the reporter to your Karma configuration (`karma.conf.js`):

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

The next time you run your test suite, the Karma probe will send the results to your Probe Dock server.



<a name="usage"></a>
## Usage

To track a test with a Probe Dock test key, add this annotation to the test name:

```js
describe("something", function() {
  it("should work @probedock(abcd)", function() {
    expect(true).toBe(true);
  });
});
```

You may also define a category, tags and tickets for a test like this:

```js
describe("something", function() {
  it("should work @probedock(key=bcde category=Integration tag=user-registration tag=validation ticket=JIRA-1000 ticket=JIRA-1012)", function() {
    expect(true).not.toBe(false);
  });
});
```



## Contributing

* [Fork](https://help.github.com/articles/fork-a-repo)
* Create a topic branch - `git checkout -b feature`
* Push to your branch - `git push origin feature`
* Create a [pull request](http://help.github.com/pull-requests/) from your branch

Please add a changelog entry with your name for new features and bug fixes.



## License

*probedock-karma* is licensed under the [MIT License](http://opensource.org/licenses/MIT).
