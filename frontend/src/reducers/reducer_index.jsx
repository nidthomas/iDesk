import { SHOW_CONTACT } from "../constants/action_type";
import { CHANGE_CONTACT } from "../constants/action_type";
import { UPDATE_CONTACT } from "../constants/action_type";
import { LOAD_CONTACTS } from "../constants/action_type";
import { CLEAR_CONTACT } from "../constants/action_type";
import { SHOW_IMAGE } from "../constants/action_type";

const initialState = {
  contacts: [],
  showContactForm: false,
  showDeleteButton: false,
  imageUrl: "",
  contact: { id: "", name: "", address: "", city: "", phone: "", email: "" }
};

function rootReducer(state = initialState, action) {
  let tempState = { ...state };

  if (action.type === LOAD_CONTACTS) {
    tempState.contacts = action.payload.contacts;
    return tempState;
  }

  if (action.type === SHOW_CONTACT) {
    tempState.contact = action.payload.contact;
    tempState.imageUrl = `/file/${action.payload.contact.id}`;

    return tempState;
  }

  if (action.type === SHOW_IMAGE) {
    tempState.imageUrl = `/file/${action.payload.contactId}`;

    return tempState;
  }

  if (action.type === CHANGE_CONTACT) {
    tempState.contact = action.payload.contact;
    tempState.contact[action.payload.field] = action.payload.value;
    return tempState;
  }

  if (action.type === UPDATE_CONTACT) {
    // tempState.contacts = action.payload.contacts;
    // tempState.showContactForm = action.payload.showContactForm;
    // return tempState;

    var payload = action.payload;
    var index_of_contact = payload.contacts.findIndex(data => data._id === payload.updated_contact._id);
    tempState.contacts[index_of_contact] = payload.updated_contact;
    tempState.showContactForm = action.payload.showContactForm;
    return tempState;
  }

  if (action.type === CLEAR_CONTACT) {
    tempState.contact = { id: "", name: "", address: "", city: "", phone: "", email: "" };
    return tempState;
  }

  return tempState;
}

export default rootReducer;
