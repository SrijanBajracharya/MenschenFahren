package com.insightfools.menschen.logger;

@FunctionalInterface
public interface LogSink {

    void log(String msg);
}
