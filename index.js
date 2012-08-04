var execFile, waveform_bin;

execFile = require('child_process').execFile;
waveform_bin = path.resolve(__dirname, "bin", "waveform");

module.exports = function(audiofile, pngfile, options, callback) {
  var cmdline, value, opt;

  cmdline = [audiofile, pngfile];
  for (opt in options) {
    if (options.hasOwnProperty(opt)) {
      value = options[opt];
      cmdline.push('--' + opt);
      cmdline.push(value);
    }
  }
  
  execFile(waveform_bin, cmdline, function(err, stdout, stderr) {
    if (err) {
      callback(err);
    } else if (stderr.length) {
      callback(stderr);
    } else {
      callback(null);
    }
  });
};