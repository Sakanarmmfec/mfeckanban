# Kanban Teams App

A simple Kanban board application for Microsoft Teams.

## Setup

1. **Host the files**: Upload `kanban.html` to a web server (HTTPS required)
2. **Update manifest**: Replace `your-domain.com` in `manifest.json` with your actual domain
3. **Add icons**: Create `color.png` (192x192) and `outline.png` (32x32) icons
4. **Package app**: Create a zip file containing `manifest.json`, `kanban.html`, and icon files
5. **Upload to Teams**: Go to Teams Admin Center > Manage apps > Upload custom app

## Features

- Three columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Add new tasks with simple prompts
- Teams-integrated interface

## Requirements

- HTTPS hosting
- Valid domain in Teams app catalog