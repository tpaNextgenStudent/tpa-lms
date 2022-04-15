import { setConfig } from 'next/config';
import config from './next.config';

//setup next config to make publicRuntimeConfig variables (like BASE_URL) available
setConfig(config);
