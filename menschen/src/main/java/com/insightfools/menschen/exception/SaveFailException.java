package com.insightfools.menschen.exception;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
public class SaveFailException extends Exception {

    private static final long serialVersionUID = -7088454171832962477L;

    public SaveFailException() {
        super("The entity failed to save.");
    }

    public SaveFailException(String message) {
        super(message);
    }

}
