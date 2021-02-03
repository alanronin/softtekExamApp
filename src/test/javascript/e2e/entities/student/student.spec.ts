import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentComponentsPage, StudentDeleteDialog, StudentUpdatePage } from './student.page-object';

const expect = chai.expect;

describe('Student e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentComponentsPage: StudentComponentsPage;
  let studentUpdatePage: StudentUpdatePage;
  let studentDeleteDialog: StudentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Students', async () => {
    await navBarPage.goToEntity('student');
    studentComponentsPage = new StudentComponentsPage();
    await browser.wait(ec.visibilityOf(studentComponentsPage.title), 5000);
    expect(await studentComponentsPage.getTitle()).to.eq('Students');
    await browser.wait(ec.or(ec.visibilityOf(studentComponentsPage.entities), ec.visibilityOf(studentComponentsPage.noResult)), 1000);
  });

  it('should load create Student page', async () => {
    await studentComponentsPage.clickOnCreateButton();
    studentUpdatePage = new StudentUpdatePage();
    expect(await studentUpdatePage.getPageTitle()).to.eq('Create or edit a Student');
    await studentUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    const nbButtonsBeforeCreate = await studentComponentsPage.countDeleteButtons();

    await studentComponentsPage.clickOnCreateButton();

    await promise.all([
      studentUpdatePage.setFirstNameInput('firstName'),
      studentUpdatePage.setLastNameInput('lastName'),
      studentUpdatePage.setEmailInput('email'),
      studentUpdatePage.setAddressLineInput('addressLine'),
      studentUpdatePage.setCityInput('city'),
      studentUpdatePage.setStateInput('state'),
      studentUpdatePage.setCountryCodeInput('5'),
      studentUpdatePage.setLanguageCodeInput('5'),
      studentUpdatePage.setContactPhoneInput('5'),
      // studentUpdatePage.courseSelectLastOption(),
    ]);

    expect(await studentUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await studentUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await studentUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await studentUpdatePage.getAddressLineInput()).to.eq('addressLine', 'Expected AddressLine value to be equals to addressLine');
    expect(await studentUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await studentUpdatePage.getStateInput()).to.eq('state', 'Expected State value to be equals to state');
    expect(await studentUpdatePage.getCountryCodeInput()).to.eq('5', 'Expected countryCode value to be equals to 5');
    expect(await studentUpdatePage.getLanguageCodeInput()).to.eq('5', 'Expected languageCode value to be equals to 5');
    expect(await studentUpdatePage.getContactPhoneInput()).to.eq('5', 'Expected contactPhone value to be equals to 5');

    await studentUpdatePage.save();
    expect(await studentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Student', async () => {
    const nbButtonsBeforeDelete = await studentComponentsPage.countDeleteButtons();
    await studentComponentsPage.clickOnLastDeleteButton();

    studentDeleteDialog = new StudentDeleteDialog();
    expect(await studentDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Student?');
    await studentDeleteDialog.clickOnConfirmButton();

    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
