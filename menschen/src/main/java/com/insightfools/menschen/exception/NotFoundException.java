package com.insightfools.menschen.exception;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
public class NotFoundException extends Exception {

    private static final long serialVersionUID = -8020348240743156110L;

    public NotFoundException() {
        super("That entity was not found.");
    }

    public NotFoundException(String message) {
        super(message);
    }

}
