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
      var numberOfResultsWithKey = _.reduce(this.testRun.results, function(memo, result) {
        return memo + (result.key ? 1 : 0);
      }, 0);

      log.info('Found ' + (numberOfResultsWithKey ? numberOfResultsWithKey : 'no') + ' results to send to Probe Dock (' + numberOfResults + ' results in total)');
    }

    var startTime = new Date().getTime();

    var promise = probedock.client.process(this.testRun, this.config).then(_.partial(logInfo, startTime, log)).fail(logError);

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

function logError(err) {
  log.warn(err.message + "\n" + err.stack);
}
