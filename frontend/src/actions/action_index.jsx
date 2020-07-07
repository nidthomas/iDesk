import { CLEAR_CONTACT } from "../constants/action_type";
import { SHOW_CONTACT } from "../constants/action_type";
import { LOAD_CONTACTS } from "../constants/action_type";
import { CHANGE_CONTACT } from "../constants/action_type";
import { UPDATE_CONTACT } from "../constants/action_type";
import { SHOW_IMAGE } from "../constants/action_type";

export const clearContact = payload => {
  return { type: CLEAR_CONTACT, payload };
};

export const showContact = payload => {
  return { type: SHOW_CONTACT, payload };
};

export const showImage = payload => {
  return { type: SHOW_IMAGE, payload };
};

export const loadContacts = payload => {
  return { type: LOAD_CONTACTS, payload };
};

export const changeContact = payload => {
  return { type: CHANGE_CONTACT, payload };
};

export const updateContact = payload => {
  return { type: UPDATE_CONTACT, payload };
};
