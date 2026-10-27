# PCCS Website Worklog

## Project location

- Website source: `Website/download code/pccs-proposal1-main/option1`
- Repository: `startfromx/pccs-proposal1`
- Default branch: `main`
- Active development branch: `cleanup/site-structure`
- Published site: `https://startfromx.github.io/pccs-proposal1/`

## How to resume work

```bash
cd "/Users/a2021/Desktop/x/pccs-proposal"
git status
git fetch origin
git branch -avv
```

Before making changes, confirm which branch is active. Work in a feature branch and merge through a pull request into `main`.

## Completed work

- Aligned English and Chinese Engineering page imagery.
- Aligned English and Chinese Our Work page imagery.
- Added shared glass-style hero tile treatment, hover effects, reveal animation, and smooth scrolling.
- Reused the Leadership component across Group and Investors pages.
- Updated Group page imagery and Chinese Group Values styling.
- Added and refined Sustainability page sections, imagery, slider layout, Focus areas links, and tile behavior.
- Converted image references to WebP where applicable.
- Added Careers and Investors CMS-related sections.
- Added Supabase FAQ CMS setup.
- Added GitHub Pages deployment workflow.

## GitHub workflow

1. Create or switch to a feature branch.
2. Make and test a focused change.
3. Review the changes:

   ```bash
   git status
   git diff
   ```

4. Commit and push:

   ```bash
   git add -u
   git commit -m "Describe the change"
   git push -u origin BRANCH_NAME
   ```

5. Open a pull request into `main` and review the Files changed tab before merging.

## Deployment note

GitHub Pages publishes the `option1` folder. The current workflow is configured to trigger automatically on `current-design`; deployments from `main` may need to be started manually until the workflow is updated to include `main`.

After deployment, allow a few minutes for GitHub Pages and browser caches to update. Use `Command + Shift + R` for a hard refresh.

## Security reminders

- Never commit passwords, API keys, tokens, private keys, or confidential documents.
- The repository is public; every tracked file may be publicly accessible.
- Review PDFs and other documents before adding them to the published website.
- Protect `main` with pull-request review and status checks.
- Expand `.gitignore` to cover `.env` files, credentials, keys, and local system files.
- Keep third-party GitHub Actions restricted and pinned where practical.

## Current follow-up items

- Configure the Pages workflow to deploy automatically from `main`.
- Add branch protection for `main`.
- Improve `.gitignore` and add secret scanning/push protection.
- Review public documents and remove anything not intended for public access.
- Keep English and Chinese page structure, imagery, and links synchronized.
