import { logInfo } from '@gannochenko/etc';
import { app } from './server';

const host = app.get('host');
const port = app.get('port');

app.listen({ port }, () => {
    logInfo(`🚀 <%- application_code %> is ready at http://${host}:${port}`);
});
