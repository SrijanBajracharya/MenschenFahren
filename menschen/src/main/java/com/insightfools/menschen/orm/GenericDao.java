package com.insightfools.menschen.orm;

import java.io.Serializable;
import java.util.List;

import com.insightfools.menschen.exception.DeleteFailException;
import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 * @param <T>
 * @param <Pk>
 */
public interface GenericDao<T extends Serializable, Pk> {

    public T persist(T t) throws SaveFailException;

    public T merge(T t) throws SaveFailException;

    public void remove(T t) throws DeleteFailException;

    public void remove(Pk id) throws DeleteFailException;

    public List<T> findAll();

    public T findByPk(Pk id) throws NotFoundException;
}
