document.getElementById('generateBtn').addEventListener('click', async () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';

  const companyName = document.getElementById('companyName').value.trim();
  const recipientEmail = document.getElementById('recipientEmail').value.trim();

  if (!companyName || !recipientEmail) {
    alert("Please enter both the company name and recipient email.");
    spinner.style.display = 'none';
    return;
  }

  chrome.storage.local.get(['openai_api_key'], async (result) => {
    const apiKey = result.openai_api_key;
    if (!apiKey) {
      alert('OpenAI API key is missing. Please add it in the extension settings.');
      spinner.style.display = 'none';
      return;
    }

    const templatePath = chrome.runtime.getURL("templates/sales_template.txt");
    const template = await fetch(templatePath).then(res => res.text()).catch(() => "Reach out professionally.");
    const filledPrompt = template.replace(/\[Company Name\]/g, companyName).replace(/\[Email\]/g, recipientEmail);

    const replyResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: filledPrompt }],
        max_tokens: 400,
      }),
    });

    const replyData = await replyResp.json();
    const generatedReply = replyData.choices[0].message.content.trim();

    // Use chrome.identity to get OAuth token
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (!token) {
        alert('Failed to get auth token.');
        spinner.style.display = 'none';
        return;
      }

      const rawEmail = [
        `To: ${recipientEmail}`,
        "Subject: Let's connect!",
        'Content-Type: text/plain; charset="UTF-8"',
        '',
        generatedReply
      ].join("\n");

      const base64EncodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const gmailResp = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: {
            raw: base64EncodedEmail
          }
        })
      });

      if (gmailResp.ok) {
        alert('✅ Draft created successfully in Gmail!');
      } else {
        const error = await gmailResp.json();
        console.error('Failed to create draft:', error);
        alert('❌ Failed to create Gmail draft. Check console for details.');
      }

      spinner.style.display = 'none';
    });
  });
});
