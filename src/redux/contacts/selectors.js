import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.filter.filter;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return filter.length > 0
      ? contacts.filter(item =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  }
);
