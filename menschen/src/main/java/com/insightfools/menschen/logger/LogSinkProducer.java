package com.insightfools.menschen.logger;

import java.util.logging.Logger;

import javax.enterprise.inject.spi.InjectionPoint;
import javax.ws.rs.Produces;

public class LogSinkProducer {

    @Produces
    public LogSink produce(InjectionPoint ip) {
        Class<?> injectionTarget = ip.getMember().getDeclaringClass();
        return Logger.getLogger(injectionTarget.getName())::info;
    }
}
