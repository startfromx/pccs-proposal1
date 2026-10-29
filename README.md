# PCCS Website

Corporate website for PCCS Group Berhad, including English and Chinese pages for the Group, Our Work, Engineering, Sustainability, Investors, Careers, and Contact sections.

## Website source

The published static website is located at:

```text
Website/download code/pccs-proposal1-main/option1
```

Published URL:

<https://startfromx.github.io/pccs-proposal1/>

## Preview locally

From the website source directory, start a local web server:

```bash
cd "Website/download code/pccs-proposal1-main/option1"
python3 -m http.server 8000
```

Open <http://localhost:8000/> in a browser. A local server is recommended because the pages use relative assets and JavaScript behavior that may not work correctly when opened directly with `file://`.

## Git workflow

Use a feature branch for changes:

```bash
git fetch origin
git switch -c feature/short-description origin/main
```

Review, commit, and push focused changes:

```bash
git status
git diff
git add -u
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Open a pull request into `main` and review the **Files changed** tab before merging.

## Documentation

See [WORKLOG.md](WORKLOG.md) for project history, deployment notes, security reminders, and follow-up tasks.

See [SEO_AEO_LAUNCH_CHECKLIST.md](SEO_AEO_LAUNCH_CHECKLIST.md) for the search-engine and answer-engine launch requirements, including the manual Search Console and Bing Webmaster steps.

## Security

This is a public repository and a static website. Do not commit passwords, API keys, private keys, confidential documents, or other secrets. Review public PDFs and assets before adding them to the published website.

Before giving CMS access to a client, run [`supabase-pccs-security.sql`](Website/download%20code/pccs-proposal1-main/option1/content/supabase-pccs-security.sql) in the Supabase SQL Editor. Add the approved login email to `public.pccs_admins`, disable public sign-ups, and use invited users only. The browser Supabase anon key is public by design; database access is protected by Supabase RLS and the admin allowlist.
