package com.insightfools.menschen.exception;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
public class DeleteFailException extends Exception {

    private static final long serialVersionUID = -6029204230530406882L;

    public DeleteFailException() {
        super("Failed to delete the entity.");
    }

    public DeleteFailException(String message) {
        super(message);
    }

}
