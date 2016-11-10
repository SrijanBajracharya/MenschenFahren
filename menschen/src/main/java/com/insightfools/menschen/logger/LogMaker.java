package com.insightfools.menschen.logger;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;

public class LogMaker {

    @Inject
    private LogSink LOG;

    @AroundInvoke
    public Object logCall(InvocationContext ic) throws Exception {
        // LOG.log("* " + ic.getMethod());
        return ic.proceed();
    }
}
