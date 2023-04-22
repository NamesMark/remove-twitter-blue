document.addEventListener('DOMContentLoaded', () => {
    const hideBlueButtonsCheckbox = document.querySelector('#hideBlueButtons');
    const comicSansBlueTweetsCheckbox = document.querySelector('#comicSansBlueTweets');
    const hideBlueTweetsCheckbox = document.querySelector('#hideBlueTweets');
    
    hideBlueButtonsCheckbox.checked = localStorage.getItem('hideBlueButtons') === 'true';
    comicSansBlueTweetsCheckbox.checked = localStorage.getItem('comicSansBlueTweets') === 'true';
    hideBlueTweetsCheckbox.checked = localStorage.getItem('hideBlueTweets') === 'true';
  });
  
  // Handle checkbox changes and send messages to content.js
  document.querySelector('#hideBlueButtons').addEventListener('change', () => {
    const value = document.querySelector('#hideBlueButtons').checked;
    localStorage.setItem('hideBlueButtons', value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleHideBlueButtons', value });
    });
  });
  
  document.querySelector('#comicSansBlueTweets').addEventListener('change', () => {
    const value = document.querySelector('#comicSansBlueTweets').checked;
    localStorage.setItem('comicSansBlueTweets', value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleComicSansBlueTweets', value });
    });
  });
  
  document.querySelector('#hideBlueTweets').addEventListener('change', () => {
    const value = document.querySelector('#hideBlueTweets').checked;
    localStorage.setItem('hideBlueTweets', value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleHideBlueTweets', value });
    });
  });