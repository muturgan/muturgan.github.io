"use strict"

function getUniqueCSSpropertiesList() {
  let allElementsList = document.getElementsByTagName('*');
  let allCSSpropertiesList = [];
  let pureCSSpropertiesList = [];
  let uniqueCSSpropertiesList = {};
  
  
  for (let key in allElementsList) {
    try {
        let currentProperty = getComputedStyle(allElementsList[key]);
        allCSSpropertiesList.push(currentProperty);
        } catch (err) {
          let some;
        }
  }
  
  for (let i = 0; i < allCSSpropertiesList.length; i++) {
    try {
      allCSSpropertiesList[i] === 0;
      pureCSSpropertiesList.push(allCSSpropertiesList[i]);
    } catch (err) {
      console.log ('property ' + allCSSpropertiesList[i] + ' skiped');
    } 
  }
  
  for (let i = 0; i < pureCSSpropertiesList.length; i++) {
    uniqueCSSpropertiesList[allCSSpropertiesList[i]] = allCSSpropertiesList[i];
  }
  
  return uniqueCSSpropertiesList; 
}