document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('saveBtn');
  
    // Load existing key
    chrome.storage.local.get(['openai_api_key'], (result) => {
      if (result.openai_api_key) {
        apiKeyInput.value = result.openai_api_key;
      }
    });
  
    // Save new key
    saveButton.addEventListener('click', () => {
      const key = apiKeyInput.value.trim();
      if (!key) {
        alert('Please enter a valid API key.');
        return;
      }
  
      chrome.storage.local.set({ openai_api_key: key }, () => {
        alert('✅ API key saved successfully!');
      });
    });
  });
  