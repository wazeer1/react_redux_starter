import axios from 'axios';
import {ROUTES} from '../Routes.constants';
import {KEYS} from '../dataKeys';
import {CONFIG} from '../config';

const cancelToken = axios.CancelToken;

export const APIInstance = ({baseURL}) => {
    const [api, setApi] = useState(null);
    const [pending, setPending] = useState({});

    useEffect(() => {
        const api = axios.create({
            baseURL: CONFIG.API_VERSION + baseURL,
        });
        setApi(api);
    }, []);

    // update pending requests (add || delete, cancel)
    const updatePending = (config, cancel) => {
        let url = '';
        if (config && config.url) {
            url = `${config.baseURL}${config.url}`;
        }
        // Return in case method does not exists
        if (!config || !config.method) {
            return;
        }

        let flagUrl = '';
        if (config.method) {
            flagUrl = url + '&' + config.method;
        }
        if (config.params) {
            flagUrl += '&' + JSON.stringify(config.params);
        }
        if (cancel) {
            setPending[flagUrl] = cancel;
        } else {
            delete setPending[flagUrl];
        }
    };

    // set cancel pending interceptor for all requests
    const setCancelPendingInterceptor = (instance) => {
        if (!instance) {
            instance = api;
        }
        instance.interceptors.request.use((config) => {
            // eslint-disable-next-line no-console
            console.log('config', config);
            if (config.noCancel) {
                return config;
            }
            const token = localStorage.getItem(KEYS.ACCESS_TOKEN);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            config.cancelToken = new CancelToken((cancel) => {
                updatePending(config, cancel);
            });
            return config;
        });

        instance.interceptors.response.use(
            (response) => {
                updatePending(response.config);
                return response;
            },
            (error) => {
                const {response} = error;
                if (response && response.status === 401) {
                    localStorage.clear();
                    window.location = ROUTES.LOGIN;
                }
                updatePending(error.config);
                return Promise.reject(error);
            }
        );
        return instance;
    };

    // cancel all pending requests
    const cancelPending = () => {
        Object.keys(pending).forEach((e) => {
            if (pending[e]) {
                pending[e]();
                delete pending[e];
            }
        });
    };

    return {
        api,
        setApi,
        pending,
        setPending,
        updatePending,
        setCancelPendingInterceptor,
        cancelPending,
    };
};
