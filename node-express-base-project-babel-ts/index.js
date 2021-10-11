// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

if (process.env.NODE_ENV === 'develop') {
  require('@babel/register')({
    extensions: ['.js', '.ts'],
  });

  require('./src/app');
} else {
  require('./build/app');
}
