function hideButtons() {
    console.log("Hiding buttons");
    const blueButton = document.querySelector('a[href="/i/twitter_blue_sign_up"]');
    const verifiedButton = document.querySelector('a[href="/i/verified-orgs-signup"]');
    if (blueButton) {
        blueButton.style.display = "none";
    }
    if (verifiedButton) {
        verifiedButton.style.display = "none";
    }
}

function comicSansThem(tweetContainer, apply) {
    const isVerified = tweetContainer.querySelector('svg[aria-label="Verified account"]');
  
    if (isVerified) {
      const tweetText = tweetContainer.querySelector('div[lang]');
      const username = tweetContainer.querySelector('div[dir="ltr"] > span');
  
      if (apply) {
        if (tweetText) {
          tweetText.style.fontFamily = 'Comic Sans MS, sans-serif';
          tweetText.style.fontSize = '12px';
          tweetText.style.fontStyle = 'italic';
        }
        if (username) {
          username.style.fontFamily = 'Comic Sans MS, sans-serif';
        }
      } else {
        if (tweetText) {
          tweetText.style.fontFamily = '';
          tweetText.style.fontSize = '';
          tweetText.style.fontStyle = '';
        }
        if (username) {
          username.style.fontFamily = '';
        }
      }
    }
  }
  
  // Refactored applyChanges function
  function applyChanges() {
    hideButtons();
    const hideBlueTweetsState = localStorage.getItem('hideBlueTweets') === 'true';
    const comicSansBlueTweetsState = localStorage.getItem('comicSansBlueTweets') === 'true';
  
    const tweetContainers = document.querySelectorAll('article[role="article"]');
    tweetContainers.forEach(tweetContainer => {
      comicSansThem(tweetContainer, comicSansBlueTweetsState);
      if (hideBlueTweetsState) {
        hideBlueTweets();
      } else {
        showBlueTweets();
      }
    });
  
    const targetNode = document.querySelector('body');
    const config = { childList: true, subtree: true };
  
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const newTweets = node.querySelectorAll('article[role="article"]');
              newTweets.forEach(tweetContainer => {
                comicSansThem(tweetContainer, comicSansBlueTweetsState);
                if (hideBlueTweetsState) {
                  hideBlueTweets();
                } else {
                  showBlueTweets();
                }
              });
            }
          });
        }
      }
    });
  
    observer.observe(targetNode, config);
  }
  
  // Update the message listener to store the menu items state in localStorage
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'toggleHideBlueButtons':
        localStorage.setItem('hideBlueButtons', request.value);
        if (request.value) {
          hideButtons();
        } else {
          showButtons();
        }
        break;
      case 'toggleComicSansBlueTweets':
        localStorage.setItem('comicSansBlueTweets', request.value);
        if (request.value) {
          applyComicSans();
        } else {
          removeComicSans();
        }
        break;
      case 'toggleHideBlueTweets':
        localStorage.setItem('hideBlueTweets', request.value);
        if (request.value) {
          hideBlueTweets();
        } else {
          showBlueTweets();
        }
        break;
    }
  });

  function applyComicSans() {
    const tweetContainers = document.querySelectorAll('article[role="article"]');
    tweetContainers.forEach(tweetContainer => {
      comicSansThem(tweetContainer, true);
    });
  }
  
  function removeComicSans() {
    const tweetContainers = document.querySelectorAll('article[role="article"]');
    tweetContainers.forEach(tweetContainer => {
      comicSansThem(tweetContainer, false);
    });
  }

  function hideBlueTweets() {
    const tweetContainers = document.querySelectorAll('article[role="article"]');
    tweetContainers.forEach(tweetContainer => {
      const isVerified = tweetContainer.querySelector('svg[aria-label="Verified account"]');
      if (isVerified) {
        tweetContainer.style.display = 'none';
      }
    });
  }
  
  function showBlueTweets() {
    const tweetContainers = document.querySelectorAll('article[role="article"]');
    tweetContainers.forEach(tweetContainer => {
      const isVerified = tweetContainer.querySelector('svg[aria-label="Verified account"]');
      if (isVerified) {
        tweetContainer.style.display = '';
      }
    });
  }
  
  window.onload = () => {
    const hideBlueButtonsState = localStorage.getItem('hideBlueButtons') === 'true';
    if (hideBlueButtonsState) {
      setTimeout(hideButtons, 1000);
      setTimeout(hideButtons, 2000);
    }
    setTimeout(applyChanges, 3000);
  };