# Quietloop

Landing page and waitlist for Quietloop, an AI automation service for small teams.

| File | What it is |
| --- | --- |
| `index.html` | The landing page. One file, no build step. |
| `waitlist-apps-script.gs` | Backend that saves signups into a Google Sheet. |

## Connect the waitlist

The page is static, so it needs somewhere to send signups. Until you do the
steps below, the form tells visitors the waitlist isn't connected and saves
nothing.

1. Create a new Google Sheet. Name it "Quietloop waitlist".
2. Open **Extensions → Apps Script** and replace the contents with `waitlist-apps-script.gs`.
3. Click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Approve the permissions Google asks for, then copy the **Web app URL**.
5. Open that URL in a browser. It should say "Quietloop waitlist is running."
6. In `index.html`, paste the URL into `const WAITLIST_ENDPOINT = "";` and commit.
7. Submit the form once with your own email. A "Waitlist" tab appears in the Sheet with one row.

If you change the script later, use **Deploy → Manage deployments → Edit → New version**
so the URL stays the same.

The browser can't read Google's reply, so the page shows "You're on the list" once
the request is sent. Duplicate emails are ignored by the script.

## Put it online

The page works on any static host. Easiest options:

- **GitHub Pages**: Settings → Pages → deploy from a branch. The page is then at `/quietloop/`.
  For a standalone site, move this folder into its own repository and put `index.html` at the root.
- **Cloudflare Pages** or **Netlify**: drag the folder in.

Then buy a domain and point it at the host.

## Edit the page

- Copy lives in `index.html`. Search for the text and change it.
- Colours and fonts are the variables at the top of the `<style>` block.
- The run log in the hero is an illustrative example and is labelled as one. Keep that label
  unless you replace it with a real customer's data and their permission.
- The privacy line under the form promises that people can opt out. Only keep it if you will do that.
