import { Settings } from "../core/settings";

export class DonateForm {
  #donateForm;
  #totalAmount;
  #totalAmountHTML;
  #maxDonate;
  #minDonate;
  #createNewDonates;

  static TextObj = {
    DonateButtonText: 'Задонатить',
    InputLabel: `Введите сумму в ${Settings.currency}`
  }

  static DefDonateValues = {
    min:0,
    max:100
  }

  constructor(totalAmount, createNewDonates, maxDonate, minDonate){
    this.#totalAmount = totalAmount;
    this.#createNewDonates = createNewDonates;
    this.#maxDonate = maxDonate || DonateForm.DefDonateValues.max;
    this.#minDonate = minDonate || DonateForm.DefDonateValues.min;    
  }

  #renderDonateButton(){
    const donateButton = document.createElement('button');
    donateButton.className = 'donate-form__submit-button';
    donateButton.setAttribute('type','submit');
    donateButton.textContent = DonateForm.TextObj.DonateButtonText;
    return donateButton;
  }

  #renderInput(){
    const inputLabel = document.createElement('label');
    const input = document.createElement('input');
    inputLabel.className = 'donate-form__input-label';
    inputLabel.textContent = DonateForm.TextObj.InputLabel;
    input.className = 'donate-form__donate-input';
    input.setAttribute('name','amount');
    input.setAttribute('type','number');
    input.setAttribute('min', this.#minDonate);
    input.setAttribute('max', this.#maxDonate);
    input.setAttribute('required','required');
    inputLabel.append(input);
    return inputLabel;
  }

  #onCreatenewDonate(event){
    event.preventDefault();
    const newDonateValue = Number(event.target.amount.value);
    if(newDonateValue && this.#createNewDonates){
      const newDonate = {
        date: new Date(),
        amount: newDonateValue
      };
      this.#createNewDonates(newDonate);
      event.target.amount.value = '';
    }
  }

  uppdateTotalAmount(newAmount){
    this.#totalAmountHTML.textContent = `${newAmount} ${Settings.currency}`;
  }

  render(){
    this.#donateForm = document.createElement('form');
    this.#donateForm.className = 'donate-form';
    this.#donateForm.addEventListener('submit', this.#onCreatenewDonate.bind(this));
    this.#totalAmountHTML = document.createElement('h1');
    this.#totalAmountHTML.id = 'total-amount';
    this.uppdateTotalAmount(this.#totalAmount);
    const donateButton = this.#renderDonateButton();
    const input = this.#renderInput();

    this.#donateForm.append(this.#totalAmountHTML, input, donateButton);

    return this.#donateForm;
  }
}