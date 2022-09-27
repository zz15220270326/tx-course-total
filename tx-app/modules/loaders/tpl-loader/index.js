module.exports = function (source) {

  var outputSource = source.replace(/(\s|\n)+/g, ' ');

  return `
    export default function () {
      return '${ outputSource }';
    }
  `;
};
