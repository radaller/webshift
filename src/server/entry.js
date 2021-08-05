const dotenv = require('dotenv');
dotenv.config();
__webpack_public_path__ = process.env.PUBLIC_PATH;
require('./index');