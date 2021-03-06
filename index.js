var _ = require('underscore'),
    q = require('q'),
    probedock = require('probedock-node');

function ProbeDockKarmaReporter(logger, options) {
  this.log = logger.create('reporter.probedock');
  this.options = options || {};
}

ProbeDockKarmaReporter.$inject = ['logger', 'config.probedock'];
exports['reporter:probedock'] = [ 'type', ProbeDockKarmaReporter ];

_.extend(ProbeDockKarmaReporter.prototype, {

  onRunStart: function() {
    this.config = probedock.client.loadConfig(this.options.config);
    this.testRun = probedock.client.startTestRun(this.config);
    this.uploads = [];
  },

  onSpecComplete: function(browser, result) {
    if (result.skipped) {
      return;
    }

    var name = result.suite.join(' ') + ' ' + result.description,
        options = {
          nameParts: result.suite.concat([ result.description ])
        };

    if (!result.success) {
      options.message = browser.name + ': ' + result.log.join("\n");
    }

    this.testRun.add(null, name, result.success, result.time, options);
  },

  onRunComplete: function() {
    this.testRun.end();

    var log = this.log;

    var numberOfResults = this.testRun.results.length;
    if (numberOfResults) {
      log.info('Found ' + numberOfResults + ' results to send to Probe Dock');
    }

    var startTime = new Date().getTime();

    var promise = probedock.client.process(this.testRun, this.config).then(_.partial(logInfo, startTime, log)).fail(_.partial(logError, log));

    this.uploads.push(promise);

    var uploads = this.uploads;
    promise.fin(function() {
      uploads.splice(uploads.indexOf(promise), 1);
    });
  },

  onExit: function(done) {
    if (this.uploads.length) {
      this.log.info('Waiting on test results to be published to Probe Dock...');
    }
    q.all(this.uploads).fin(done);
  }
});

function logInfo(startTime, log, info) {
  if (info.errors.length) {
    _.each(info.errors, function(error) {
      log.warn(error);
    });
  } else if (!info.published) {
    log.info('Publishing disabled');
  } else {
    var duration = new Date().getTime() - startTime;
    log.info('Test results successfully published in ' + (duration / 1000) + 's');
  }
}

function logError(log, err) {
  log.warn(err.stack);
}
