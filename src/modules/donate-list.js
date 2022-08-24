import { Settings } from "../core/settings";
import * as Utils from '../core/utils';

export class DonateList {
  #donates;
  #donateItemsHTML;

  static TextObj = {
    DonateList: 'Список донатов'
  }

  constructor(donates){
    this.#donates = donates;
  }

  #renderDonates(container){
    this.#donateItemsHTML.innerHTML = '';
    this.#donates.forEach((element) => {
      const donateItemHTML = document.createElement('div');
      donateItemHTML.className = 'donate-item';
      const creationTime = Utils.getFormattedTime(element.date);
      donateItemHTML.innerHTML = `${creationTime} - <b>${element.amount} ${Settings.currency} </b>`;
      container.append(donateItemHTML);     
    });
  }

  uppdateDonates(uppdatedDonates){
    this.#donates = uppdatedDonates;
    this.#renderDonates(this.#donateItemsHTML);
  }

  render(){
    const donateContainer = document.createElement('div');
    donateContainer.className = 'donates-container';
    const donateText = document.createElement('h2');
    donateText.className = 'donates-container__title';
    donateText.textContent = DonateList.TextObj.DonateList;
    this.#donateItemsHTML = document.createElement('div');
    this.#donateItemsHTML.className = 'donates-container__donates';
    this.#renderDonates(this.#donateItemsHTML);
    donateContainer.append(donateText, this.#donateItemsHTML);


    return donateContainer;
  };
}