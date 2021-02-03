import { element, by, ElementFinder } from 'protractor';

export class TeacherComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-teacher div table .btn-danger'));
  title = element.all(by.css('jhi-teacher div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class TeacherUpdatePage {
  pageTitle = element(by.id('jhi-teacher-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  emailInput = element(by.id('field_email'));
  addressLineInput = element(by.id('field_addressLine'));
  cityInput = element(by.id('field_city'));
  stateInput = element(by.id('field_state'));
  countryCodeInput = element(by.id('field_countryCode'));
  languageCodeInput = element(by.id('field_languageCode'));
  phoneInput = element(by.id('field_phone'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setAddressLineInput(addressLine: string): Promise<void> {
    await this.addressLineInput.sendKeys(addressLine);
  }

  async getAddressLineInput(): Promise<string> {
    return await this.addressLineInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setStateInput(state: string): Promise<void> {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput(): Promise<string> {
    return await this.stateInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode: string): Promise<void> {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput(): Promise<string> {
    return await this.countryCodeInput.getAttribute('value');
  }

  async setLanguageCodeInput(languageCode: string): Promise<void> {
    await this.languageCodeInput.sendKeys(languageCode);
  }

  async getLanguageCodeInput(): Promise<string> {
    return await this.languageCodeInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TeacherDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-teacher-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-teacher'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
