const cp = require('child_process');
const { resolve } = require('path');

async function startProcess({
  url,
  onMessage,
  onExit,
  onError
}) {
  const script = resolve(__dirname, '../crawlers', url),
        childProcess = cp.fork(script, []);

  let invoked = false;

  childProcess.on('message', (data) => {
    typeof onMessage === 'function' && onMessage(data);
  });

  childProcess.on('exit', (data) => {
    if (invoked) {
      return;
    }
    invoked = true;
    typeof onExit === 'function' && onExit(`exit ${ data }`);
  });

  childProcess.on('error', (err) => {
    if (invoked) {
      return;
    }
    invoked = true;
    typeof onError === 'function' && onError(err);
  });
}

module.exports = {
  startProcess,
};