module.exports = {
  name: 'ngx-cz-in',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-cz-in',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
