import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeacherComponentsPage, TeacherDeleteDialog, TeacherUpdatePage } from './teacher.page-object';

const expect = chai.expect;

describe('Teacher e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teacherComponentsPage: TeacherComponentsPage;
  let teacherUpdatePage: TeacherUpdatePage;
  let teacherDeleteDialog: TeacherDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Teachers', async () => {
    await navBarPage.goToEntity('teacher');
    teacherComponentsPage = new TeacherComponentsPage();
    await browser.wait(ec.visibilityOf(teacherComponentsPage.title), 5000);
    expect(await teacherComponentsPage.getTitle()).to.eq('Teachers');
    await browser.wait(ec.or(ec.visibilityOf(teacherComponentsPage.entities), ec.visibilityOf(teacherComponentsPage.noResult)), 1000);
  });

  it('should load create Teacher page', async () => {
    await teacherComponentsPage.clickOnCreateButton();
    teacherUpdatePage = new TeacherUpdatePage();
    expect(await teacherUpdatePage.getPageTitle()).to.eq('Create or edit a Teacher');
    await teacherUpdatePage.cancel();
  });

  it('should create and save Teachers', async () => {
    const nbButtonsBeforeCreate = await teacherComponentsPage.countDeleteButtons();

    await teacherComponentsPage.clickOnCreateButton();

    await promise.all([
      teacherUpdatePage.setFirstNameInput('firstName'),
      teacherUpdatePage.setLastNameInput('lastName'),
      teacherUpdatePage.setEmailInput('email'),
      teacherUpdatePage.setAddressLineInput('addressLine'),
      teacherUpdatePage.setCityInput('city'),
      teacherUpdatePage.setStateInput('state'),
      teacherUpdatePage.setCountryCodeInput('5'),
      teacherUpdatePage.setLanguageCodeInput('5'),
      teacherUpdatePage.setPhoneInput('5'),
    ]);

    expect(await teacherUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await teacherUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await teacherUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await teacherUpdatePage.getAddressLineInput()).to.eq('addressLine', 'Expected AddressLine value to be equals to addressLine');
    expect(await teacherUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await teacherUpdatePage.getStateInput()).to.eq('state', 'Expected State value to be equals to state');
    expect(await teacherUpdatePage.getCountryCodeInput()).to.eq('5', 'Expected countryCode value to be equals to 5');
    expect(await teacherUpdatePage.getLanguageCodeInput()).to.eq('5', 'Expected languageCode value to be equals to 5');
    expect(await teacherUpdatePage.getPhoneInput()).to.eq('5', 'Expected phone value to be equals to 5');

    await teacherUpdatePage.save();
    expect(await teacherUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Teacher', async () => {
    const nbButtonsBeforeDelete = await teacherComponentsPage.countDeleteButtons();
    await teacherComponentsPage.clickOnLastDeleteButton();

    teacherDeleteDialog = new TeacherDeleteDialog();
    expect(await teacherDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Teacher?');
    await teacherDeleteDialog.clickOnConfirmButton();

    expect(await teacherComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
